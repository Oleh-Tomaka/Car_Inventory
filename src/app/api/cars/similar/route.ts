import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const year = searchParams.get('year')
    const vin = searchParams.get('vin')

    if (!year || !vin) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    const records = getCachedData();
    console.log('Successfully loaded records, count:', records.length)

    // Filter similar cars based on year only, excluding current VIN
    const similarCars = records
      .filter((car: any) => {
        console.log('Checking car:', car.Year, car.VIN)
        return car.Year === year && car.VIN !== vin
      })
      .slice(0, 8)
      .map((car: any) => car.VIN)

    console.log('Found similar cars:', similarCars)
    return NextResponse.json({ vins: similarCars })
  } catch (error) {
    console.error('Error in similar cars endpoint:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch similar cars',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
} 