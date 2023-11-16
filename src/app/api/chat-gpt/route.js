import { NextResponse } from 'next/server'
import { options } from '../auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import {generateTasks} from './generateTasks'

/**
 * Handles a POST request to generate tasks based on a user prompt using the ChatGPT model. This endpoint first
 * authenticates the user session. If authenticated, it extracts the user prompt from the request and calls
 * the `generateTasks` function to generate a structured list of tasks and subtasks. It returns these tasks
 * in the response.
 *
 * @param {Object} request - The incoming request object containing the user prompt in JSON format.
 * @returns {Object} - A response object with a status code and either the generated tasks or an error message.
 *
 * @throws {Error} - Throws an error if there is an issue with authentication, generating tasks, or any other
 * internal errors.
 *
 * @example
 * // Example of a POST request to this endpoint
 * fetch(`/api/generateTasks`, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ prompt: 'Organize a team-building event' }),
 * }).then(async (response) => {
 *     const body = await response.json();
 *     if (!response.ok) {
 *         console.error('Error:', body.message);
 *     } else {
 *         console.log('Generated tasks:', body.newTasks);
 *     }
 * }).catch(error => console.error('Error in POST request:', error));
 * 
 * // Expected output structure of each task object:
 * // {
 * //   id: '1',
 * //   name: 'Task name',
 * //   parent: 'root',
 * //   subtasks: [{ id: '1.1', name: 'Subtask name', parent: '1' }, ...]
 * // }
 *
 * @property {string} request.body.prompt - The user prompt used to generate tasks.
 */
export async function POST (request) {
  try {
    const session = await getServerSession(options)
    if (!session) {
      return NextResponse.json({ success: false, message: 'authentication failed' }, { status: 401 })
    }

    const params = await request.json()
    const userPrompt = params.prompt

    const newTasks = generateTasks(userPrompt);

    return NextResponse.json({newTasks}, { status: 500 })
  } catch (error) {
    return NextResponse.json({ message: 'Error calling ChatGPT:' + error }, { status: 500 })
  }

}


