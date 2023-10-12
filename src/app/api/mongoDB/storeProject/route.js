import mongoose from 'mongoose';
import {Project} from '../api/mongoModels';
import {URI} from '../api/mongoData.js';

// Save Project Data
export async function POST(request) {
  if (request.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    if (mongoose.connection.readyState !== 1) await mongoose.connect(URI);

    const { name, endDate, budget, stakeholders } = request.body;

    const project = await Project.create({ 
      name,
      endDate,
      budget,
      stakeholders,
    });

    return res.status(200).json({ success: true, data: project });
  } catch (error) {
    console.error('Error storing data:', error);
    return res.status(500).json({ success: false, message: 'Error storing data' });
  }
}
