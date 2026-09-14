import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'banner.json');

export async function GET() {
  try {
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to read banner data:", error);
    // Return a default state if file is missing or corrupted
    return NextResponse.json({
      isActive: false,
      title: "",
      description: "",
      link: "",
      linkText: ""
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await fs.writeFile(dataFilePath, JSON.stringify(body, null, 2), 'utf8');
    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error("Failed to update banner data:", error);
    return NextResponse.json({ success: false, error: 'Failed to update banner data' }, { status: 500 });
  }
}
