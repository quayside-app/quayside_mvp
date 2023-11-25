import { options } from '../../auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { createUser } from './createUser'

/**
 * Handles a POST request to create a new user in the system. This function first checks for a valid
 * user session. If authenticated, it validates the presence of the 'email' parameter in the request
 * body. Upon successful validation, it proceeds to create a user with the provided details using the
 * `createUser` function.
 *
 * @param {Object} request - The request object containing the new user's details in JSON format.
 * @returns {Object} - A response object with a status code and a message. On successful creation,
 *                     returns the user object; otherwise, returns an error message.
 *
 * @example
 * fetch(`/api/user/create`, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({
 *         email: 'example@example.com',
 *         firstName: 'John',
 *         lastName: 'Doe',
 *         // ...other optional properties
 *     }),
 * }).then(async (response) => {
 *     const body = await response.json();
 *     if (!response.ok) {
 *         console.error('Error creating user:', body.message);
 *     } else {
 *         console.log('User created:', body.user);
 *     }
 * }).catch(error => console.error('Error in POST request:', error));
 *
 * @property {string} request.body.email - The email of the user. (Required)
 * @property {string} [request.body.firstName] - The first name of the user.
 * @property {string} [request.body.lastName] - The last name of the user.
 * @property {string} [request.body.username] - The username for the user.
 * @property {Array.<string>} [request.body.teamIDs=[]] - An array of team IDs the user is associated with.
 */
export async function POST (request) {
  try {
    const params = await request.json()

    if (!params.email) {
      return NextResponse.json({ message: 'Email required.' }, { status: 400 })
    }

    const user = await createUser(
      params.email, // Required
      params.firstName,
      params.lastName,
      params.username,
      params.teamIDs
    )

    return NextResponse.json({ user }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error creating Task:' + error }, { status: 500 })
  }
}
