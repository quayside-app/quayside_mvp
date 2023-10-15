import mongoose from 'mongoose';
import { NextResponse } from "next/server";
import {Task} from '../mongoModels';
import {URI} from '../mongoData.js';

//TODO-switch to GET?
export async function POST(request) {
    try {
        const params = await request.json();

        // Require projectID or taskID, 
        if (!params.projectID && !params.taskID) {
        return NextResponse.json({ message: "Project ID or Task ID required." }, { status: 400 });
        }

        if (mongoose.connection.readyState !== 1) await mongoose.connect(URI);

        let tasks = "";
        if (params.taskID) {
            tasks = await Task.find({ _id: params.taskID});
        }else if (params.projectID) {
            tasks = await Task.find({ projectID: params.projectID});
        }
        console.log(tasks);
        return NextResponse.json({tasks}, {status:200});
        
    } catch (error) {
        return NextResponse.json({ message: 'Error getting data ' + error }, { status: 500 });
    }
}
