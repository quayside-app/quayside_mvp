import mongoose from 'mongoose'
import { options } from '../../auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

import { NextResponse } from 'next/server'
import { Project } from '../mongoModels'
import { URI } from '../mongoData.js'

/**
 * Handles a GET request to retrieve projects associated with a specified user ID.
 *
 * @param {Object} request - The request object containing the user ID as a query parameter.
 *
 * @returns {Object} - A response object with a status code and the retrieved projects or an error message.
 *
 * @throws Will throw an error if any of the required fields are missing, if there's an issue connecting to the database,
 * or if not authenticated.
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
 * @property {string} request.nextUrl.searchParams.projectID - The project ID of the project to be retrieved
 */
export async function GET (request) {
  try {
    const session = await getServerSession(options)
    if (!session) {
      return NextResponse.json({ success: false, message: 'authentication failed' }, { status: 401 })
    }
    const params = await request.nextUrl.searchParams
    const userID = params.get('userID');
    const projectID = params.get('projectID');

    // Require userID
    if (!userID && !projectID) {
      return NextResponse.json({ message: 'User ID  or Project ID required.' }, { status: 400 })
    }

    if (mongoose.connection.readyState !== 1) await mongoose.connect(URI)

    let projects;
    if (userID) {
      projects = await Project.find({ userIDs: userID });
    } else {
      projects = await Project.findOne({ _id: projectID });
    }
    
    return NextResponse.json({ projects }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error getting data ' + error }, { status: 500 })
  }
}
