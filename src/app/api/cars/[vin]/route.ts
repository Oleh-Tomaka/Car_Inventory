import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Cache for storing parsed CSV data
let cache: {
  data: any[];
  timestamp: number;
} | null = null;

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Function to load and parse CSV data
function loadCSVData() {
  const filePath = path.join(process.cwd(), 'public', 'data.csv');
  
  if (!fs.existsSync(filePath)) {
    throw new Error('Data file not found');
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    relax_quotes: true,
    trim: true
  });
}

// Function to get cached data or load fresh data
function getCachedData() {
  const now = Date.now();
  
  if (!cache || (now - cache.timestamp) > CACHE_DURATION) {
    const data = loadCSVData();
    cache = {
      data,
      timestamp: now
    };
  }
  
  return cache.data;
}

export async function GET(
  request: Request,
  context: { params: { vin: string } }
) {
  try {
    // Await the context.params to ensure it's resolved
    const { vin } = await context.params;
    
    if (!vin) {
      return NextResponse.json(
        { error: 'VIN is required' },
        { status: 400 }
      );
    }

    const records = getCachedData();
    const car = records.find((record: any) => record.VIN === vin);

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 