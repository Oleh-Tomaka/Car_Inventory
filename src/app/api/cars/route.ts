import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export async function GET(request: Request) {
  try {
    // Read the CSV file
    const csvFilePath = path.join(process.cwd(), 'public', 'data.csv');
    const fileContent = fs.readFileSync(csvFilePath, 'utf-8');

    // Parse CSV data
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
    });

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const year = searchParams.get('year');
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');

    // Filter records based on query parameters
    let filteredRecords = records;
    if (make) {
      filteredRecords = filteredRecords.filter((record: any) => 
        record.Make.toLowerCase() === make.toLowerCase()
      );
    }
    if (model) {
      filteredRecords = filteredRecords.filter((record: any) => 
        record.Model.toLowerCase() === model.toLowerCase()
      );
    }
    if (year) {
      filteredRecords = filteredRecords.filter((record: any) => 
        record.Year === year
      );
    }
    if (priceMin) {
      filteredRecords = filteredRecords.filter((record: any) => 
        parseInt(record.Price) >= parseInt(priceMin)
      );
    }
    if (priceMax) {
      filteredRecords = filteredRecords.filter((record: any) => 
        parseInt(record.Price) <= parseInt(priceMax)
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredRecords,
      total: filteredRecords.length
    });
  } catch (error) {
    console.error('Error processing CSV data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process car data' },
      { status: 500 }
    );
  }
} 