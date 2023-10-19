import mongoose from 'mongoose';
import { NextResponse } from "next/server";
import {Task} from '../mongoModels';
import {URI} from '../mongoData.js';


/**
 * An asynchronous function to handle GET requests to retrieve tasks based on either a project ID or a task ID.
 * If neither projectID nor taskID is provided, a 400 Bad Request response is returned.
 * In case of a database or other error, a 500 Internal Server Error response is returned.
 *
 * @async
 * @function
 * @param {Object} NextRequest[request] - The HTTP request object.
 * @returns {Object} - Returns a list of JSON tasks if successful, or an JSON object with an error message if unsuccessful. The HTTP status code is also returned.
 *
 * @example
 * // Example usage:
 *  fetch(`/api/mongoDB/getTasks?projectID=1234`, {
 *     method: 'GET', 
 *     headers: { 'Content-Type': 'application/json' },
 *  }).then(async (response) => {
 *     let body = await response.json();
 *     if (!response.ok) {
 *         console.error(body.message);
 *     } else {
 *         console.log(body);
 *     }
 * }).catch(error => console.error(error));
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
