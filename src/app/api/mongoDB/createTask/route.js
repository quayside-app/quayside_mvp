import mongoose from 'mongoose'
import { options } from '../../auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { Project } from '../mongoModels'
import { URI } from '../mongoData.js'
import { createTask } from './createTask'

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
 * @property {string} request.body.name - The name of the task. (Required)
 * @property {string} request.body.projectID - The ID of the project the task is associated with. (Required)
 * @property {string} [request.body.parentTaskID=null] - The ID of the parent task, if any.
 * @property {string} [request.body.description=null] - The description of the task.
 * @property {Array.<string>} [request.body.objectives=[]] - An array of objectives for the task.
 * @property {Date} [request.body.startDate=null] - The start date of the task.
 * @property {Date} [request.body.endDate=null] - The end date of the task.
 * @property {number} [request.body.budget=null] - The budget allocated for the task.
 * @property {Array.<string>} [request.body.scopesIncluded=[]] - An array of scopes included in the task.
 * @property {Array.<string>} [request.body.scopesExcluded=[]] - An array of scopes excluded from the task.
 * @property {Array.<string>} [request.body.contributorIDs=[]] - An array of contributor IDs for the task.
 * @property {Array.<Object>} [request.body.otherProjectDependencies=[]] - An array of other project dependencies.
 * @property {Array.<Object>} [request.body.otherProjectTaskDependencies=[]] - An array of dependencies related to other tasks in the project.
 * @property {string} [request.body.completionStatus=null] - The completion status of the task.
 */

export async function POST (request) {
  try {
    const session = await getServerSession(options)
    if (!session) {
      return NextResponse.json({ success: false, message: 'authentication failed' }, { status: 401 })
    }

    const params = await request.json()

    if (!params.name) {
      return NextResponse.json({ message: 'Task name required.' }, { status: 400 })
    }

    if (!params.projectID) {
      return NextResponse.json({ message: 'Project ID required' }, { status: 400 })
    }

    if (mongoose.connection.readyState !== 1) await mongoose.connect(URI)

    const projectExists = await Project.exists({ _id: params.projectID })
    if (!projectExists) {
      return NextResponse.json({ message: `Project ${params.projectID} does not exist.` }, { status: 400 })
    }

    const task = await createTask(
      params.name, // Required
      params.projectID, // Required
      params.parentTaskID || null,
      params.description || null,
      params.objectives || [],
      params.startDate || null,
      params.endDate || null,
      params.budget || null,
      params.scopesIncluded || [],
      params.scopesExcluded || [],
      params.contributorIDs || [],
      params.otherProjectDependencies || [],
      params.otherProjectTaskDependencies || [],
      params.completionStatus || null
    )

    return NextResponse.json({ task }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error creating Task:' + error }, { status: 500 })
  }
}
