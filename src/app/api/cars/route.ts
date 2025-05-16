import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const make = searchParams.get('make');
    const years = searchParams.getAll('years');
    const models = searchParams.getAll('models');
    const bodyStyles = searchParams.getAll('bodyStyles');
    const fuelTypes = searchParams.getAll('fuelTypes');
    const drivetrains = searchParams.getAll('drivetrains');
    const transmissions = searchParams.getAll('transmissions');
    const engines = searchParams.getAll('engines');
    const showInTransit = searchParams.get('showInTransit') === 'true';
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    const conditions = searchParams.getAll('conditions');
    const mileageMin = searchParams.get('mileageMin');
    const mileageMax = searchParams.get('mileageMax');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '9');

    // Read and parse CSV file
    const filePath = path.join(process.cwd(), 'public', 'data.csv');
    
    if (!fs.existsSync(filePath)) {
      console.error('CSV file not found at:', filePath);
      return NextResponse.json(
        { success: false, error: 'Data file not found' },
        { status: 404 }
      );
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Parse CSV with relaxed options to handle malformed quotes
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      relax_quotes: true,
      relax_column_count: true,
      trim: true,
      skip_records_with_empty_values: true
    });

    // Helper function to get top N most frequent items
    const getTopItems = (items: Record<string, number>, limit: number = 5) => {
      return Object.entries(items)
        .sort(([, a], [, b]) => b - a)
        .slice(0, limit)
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {} as Record<string, number>);
    };

    // Calculate all filter counts
    const filterCounts = {
      condition: {
        new: records.filter((record: any) => record['New/Used'] === 'N').length,
        preOwned: records.filter((record: any) => record['New/Used'] === 'U').length,
        certified: records.filter((record: any) => record['Certified'] === 'Yes').length,
      },
      year: getTopItems(records.reduce((acc: Record<string, number>, record: any) => {
        acc[record.Year] = (acc[record.Year] || 0) + 1;
        return acc;
      }, {}), 4),
      make: getTopItems(records.reduce((acc: Record<string, number>, record: any) => {
        acc[record.Make] = (acc[record.Make] || 0) + 1;
        return acc;
      }, {}), 5),
      model: getTopItems(records.reduce((acc: Record<string, number>, record: any) => {
        acc[record.Model] = (acc[record.Model] || 0) + 1;
        return acc;
      }, {}), 5),
      bodyStyle: getTopItems(records.reduce((acc: Record<string, number>, record: any) => {
        acc[record.Body] = (acc[record.Body] || 0) + 1;
        return acc;
      }, {}), 5),
      fuelType: getTopItems(records.reduce((acc: Record<string, number>, record: any) => {
        acc[record['Fuel']] = (acc[record['Fuel']] || 0) + 1;
        return acc;
      }, {}), 5),
      drivetrain: getTopItems(records.reduce((acc: Record<string, number>, record: any) => {
        acc[record['Drivetrain Desc']] = (acc[record['Drivetrain Desc']] || 0) + 1;
        return acc;
      }, {}), 5),
      transmission: getTopItems(records.reduce((acc: Record<string, number>, record: any) => {
        acc[record['Transmission']] = (acc[record['Transmission']] || 0) + 1;
        return acc;
      }, {}), 5),
      engine: getTopItems(records.reduce((acc: Record<string, number>, record: any) => {
        acc[record['Engine']] = (acc[record['Engine']] || 0) + 1;
        return acc;
      }, {}), 5),
    };

    // Apply filters
    let filteredRecords = records.filter((record: any) => {
      if (make && record.Make.toLowerCase() !== make.toLowerCase()) return false;
      if (years.length > 0 && !years.includes(record.Year)) return false;
      if (models.length > 0 && !models.includes(record.Model)) return false;
      if (bodyStyles.length > 0 && !bodyStyles.includes(record.Body)) return false;
      if (fuelTypes.length > 0 && !fuelTypes.includes(record['Fuel'])) return false;
      if (drivetrains.length > 0 && !drivetrains.includes(record['Drivetrain Desc'])) return false;
      if (transmissions.length > 0 && !transmissions.includes(record['Transmission'])) return false;
      if (engines.length > 0 && !engines.includes(record['Engine'])) return false;
      if (showInTransit && !record['Tags']?.includes('In-Transit')) return false;
      if (priceMin && parseInt(record.Price) < parseInt(priceMin)) return false;
      if (priceMax && parseInt(record.Price) > parseInt(priceMax)) return false;
      if (mileageMin && parseInt(record.Odometer) < parseInt(mileageMin)) return false;
      if (mileageMax && parseInt(record.Odometer) > parseInt(mileageMax)) return false;
      
      // Apply condition filters
      if (conditions.length > 0) {
        const isNew = conditions.includes('new') && record['New/Used'] === 'N';
        const isPreOwned = conditions.includes('pre-owned') && record['New/Used'] === 'U';
        const isCertified = conditions.includes('certified') && record['Certified'] === 'Yes';
        
        if (!isNew && !isPreOwned && !isCertified) return false;
      }
      
      return true;
    });

    // Calculate pagination
    const total = filteredRecords.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedRecords = filteredRecords.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedRecords,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      filterCounts
    });
  } catch (error) {
    console.error('Detailed error in API:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to process request' },
      { status: 500 }
    );
  }
} 