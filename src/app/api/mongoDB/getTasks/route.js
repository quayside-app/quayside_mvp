import mongoose from 'mongoose';
import { NextResponse } from "next/server";
import {Task} from '../mongoModels';
import {URI} from '../mongoData.js';


/**
 * Handles a GET request to retrieve tasks based on the provided project ID or task ID.
 * 
 * @param {Object} request - The request object containing query parameters.
 * @returns {Object} - A response object with a status code and the retrieved tasks or an error message.
 *
 * @throws Will throw an error if both project ID and task ID are missing or if there's an issue connecting to the database.
 * 
 * @example
 * // Example usage:
 * fetch(`/api/mongoDB/getTasks?projectID=1234`, {
 *     method: 'GET', 
 *     headers: { 'Content-Type': 'application/json' },
 * }).then(async (response) => {
 *     let body = await response.json();
 *     if (!response.ok) {
 *         console.error(body.message);
 *     } else {
 *         console.log(body);
 *     }
 * }).catch(error => console.error(error));
 * 
 * @property {string} request.nextUrl.searchParams.projectID - The ID of the project whose tasks are to be retrieved.
 * @property {string} request.nextUrl.searchParams.taskID - The ID of the individual task to be retrieved.
 */

export async function GET(request) {
    try {
        const params = await request.nextUrl.searchParams;
        const projectID = params.get("projectID");
        const taskID = params.get("taskID");

        // Require projectID or taskID, 
        if (!projectID && !taskID) {
        return NextResponse.json({ message: "Project ID or Task ID required." }, { status: 400 });
        }

        if (mongoose.connection.readyState !== 1) await mongoose.connect(URI);

        let tasks = null;
        if (taskID) {
            tasks = await Task.find({ _id: taskID});
        }else if (projectID) {
            tasks = await Task.find({ projectID: projectID});
        }
        return NextResponse.json({tasks}, {status:200});
        
    } catch (error) {
        return NextResponse.json({ message: 'Error getting data ' + error }, { status: 500 });
    }
}
