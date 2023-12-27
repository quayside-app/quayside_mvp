import mongoose from 'mongoose'
import { options } from '../../auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { URI } from '../mongoData.js'
import { editTask } from './editTask'

/**
 * Handles a POST request to create and store a new task in the database. This function
 * first authenticates the session, then validates the necessary parameters for task creation,
 * such as 'name' and 'projectID'. If the parameters are valid and the associated project exists,
 * it proceeds to create a new task with the given details.
 *
 * @param {Object} request - The request object containing the task details.
 * @returns {Object} - A response object with a status code,and the task if completed successfully ({message:<message>, task:{<task>}})
 *
 * @throws Will throw an error if any of the required fields are missing, if there's an issue connecting
 * to the database, or if the session is not authenticated.
 *
 * @example
 * // Example of using this function in a POST request
 * fetch(`/api/tasks/createTask`, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({
 *         name: 'New Task',
 *         projectID: 'proj123',
 *         // ...other task properties
 *     }),
 * }).then(async (response) => {
 *     const body = await response.json();
 *     if (!response.ok) {
 *         console.error('Task creation failed:', body.message);
 *     } else {
 *         console.log('Task created:', body.task);
 *     }
 * }).catch(error => console.error('Error in creating task:', error));
 *
 * @property {string} request.body.taskId - The ObjectID of the task. Required.
 * @property {string} request.body.name - The name of the task.
 * @property {string} request.body.description - The description of the task.
 * @property {string} request.body.startDate - The startDate of the task.
 * @property {string} request.body.endDate - The endDate of the task.
 * @ppropertyaram {[string]} contributorIDs - The contributor IDs of the task.
 * @property {[string]} contributorEmails - The contributor emails of the task. NOTE: you can not have
 *  these AND contributorIDs.
 */

export async function PUT (request) {
  try {
    const session = await getServerSession(options)
    if (!session) {
      return NextResponse.json({ success: false, message: 'Authentication failed' }, { status: 401 })
    }

    const params = await request.json()

    if (!params.taskId ) {
      return NextResponse.json({ message: 'Task ID  required.' }, { status: 400 })
    }

    if (mongoose.connection.readyState !== 1) await mongoose.connect(URI)

    //   const projectExists = await Project.exists({ _id: params.projectID });
    //   if (!projectExists) {
    //     return NextResponse.json({ message: `Project ${params.projectID} does not exist.` }, { status: 400 });
    //   }

    const updatedTask = await editTask(params.taskId, params.name, params.description, params.startDate, params.endDate)

    return NextResponse.json({ task: updatedTask }, { status: 200 })
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json({ message: 'Error updating Task: ' + error }, { status: 500 })
  }
}
