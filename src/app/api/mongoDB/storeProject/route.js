import mongoose from 'mongoose';
import { NextResponse } from "next/server";
import {Project} from '../mongoModels';
import {URI} from '../mongoData.js';

// Save Project Data
export async function POST(request) {
  if (request.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    if (mongoose.connection.readyState !== 1) await mongoose.connect(URI);

    const params = await request.json();

    const project = await Project.create({ 
      name: params.prompt,
      endDate: params.endDate,
      budget: params.budget,
      stakeholders: params.stakeholders,
    });

    return NextResponse.json({ message: "Project stored successfully" }, { status: 200 });
    
  } catch (error) {
    console.error('Error storing data:', error);
    return NextResponse.json({ message: 'Error storing data ' + error }, { status: 500 });
  }
}
