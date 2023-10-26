import mongoose from 'mongoose';
import { NextResponse } from "next/server";
import {Project} from '../mongoModels';
import {URI} from '../mongoData.js';

/**
 * Handles a GET request to retrieve projects associated with a specified user ID.
 * 
 * @param {Object} request - The request object containing the user ID as a query parameter.
 * 
 * @returns {Object} - A response object with a status code and the retrieved projects or an error message.
 *
 * @example
 * // Example usage:
 * fetch(`/api/mongoDB/getProjects?userID=12345`, {
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
 * @property {string} request.nextUrl.searchParams.userID - The user ID whose projects are to be retrieved.
 */
export async function GET(request) {
    try {

        const params = await request.nextUrl.searchParams;
        const userID = params.get("userID");

        // Require userID
        if (!userID) {
        return NextResponse.json({ message: "User ID required." }, { status: 400 });
        }

        if (mongoose.connection.readyState !== 1) await mongoose.connect(URI);

        let projects = await Project.find({ userIDs: userID });
        return NextResponse.json({projects: projects}, {status:200});
        
    } catch (error) {
        return NextResponse.json({ message: 'Error getting data ' + error }, { status: 500 });
    }
}
