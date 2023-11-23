import { options } from '../../auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { Project, Task } from '../mongoModels'
import { URI } from '../mongoData.js'

/**
* Handles a DELETE request to delete the project and all tasks of the specified project ID. 
* Returns an error message if the user is not verified.
*
* @param {Request} request - The incoming request object, containing the URL projctID parameter.
* @param {string} [projectID] - The unique ID of the project to retrieve.
* @returns {NextResponse} A Next.js response object. If successful, it returns a 200 status with a success
* message. In case of an error, it returns a 500 status with an error message.
 *
 * @returns {Object} - A response object with a status code and the confirmation or error message.
 * 
 * @example
 * // Example usage:
 * await fetch(`/api/mongoDB/deleteProject?projectID=1234`, {
 *    method: 'DELETE'
 *  }).catch(error => console.error('Error:', error));
 */

export async function DELETE (request) {
    try {
      const session = await getServerSession(options)
      if (!session) {
        return NextResponse.json({ success: false, message: 'authentication failed' }, { status: 401 })
      }

      const params = await request.nextUrl.searchParams
      const projectID = params.get('projectID');

      if (mongoose.connection.readyState !== 1) await mongoose.connect(URI);
      await Task.deleteMany({ projectID: projectID });
      await Project.deleteOne({ _id: projectID });

      return NextResponse.json({message: 'Project deleted successfully'}, { status: 200 })
    } catch (error) {
      return NextResponse.json({ message: 'Error deleting project ' + error }, { status: 500 })
    }
  }
  