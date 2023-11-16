import { NextResponse } from 'next/server'
import { options } from '../../auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { getUsers } from './getUsers'

/**
 * Handles a GET request to retrieve user data based on provided query parameters. This function first
 * authenticates the user session. If authenticated, it checks for the presence of either a user ID or
 * email in the query parameters.
 *
 * @param {Object} request - The incoming request object with query parameters.
 * @returns {Object} - A response object with a status code and either the user data or an error message.
 *
 * @example
 * // Example of a GET request to this endpoint with an ID
 * fetch(`/api/users?id=12345`)
 *   .then(async (response) => {
 *     const body = await response.json();
 *     if (!response.ok) {
 *         console.error('Error:', body.message);
 *     } else {
 *         console.log('User data:', body.users);
 *     }
 * }).catch(error => console.error('Error in GET request:', error));
 *
 * // Example of a GET request to this endpoint with an email
 * fetch(`/api/users?email=user@example.com`)
 *   .then(async (response) => {
 *     const body = await response.json();
 *     if (!response.ok) {
 *         console.error('Error:', body.message);
 *     } else {
 *         console.log('User data:', body.users);
 *     }
 * }).catch(error => console.error('Error in GET request:', error));
 *
 * @property {string} [request.nextUrl.searchParams.get('id')] - The user ID to search for.
 * @property {string} [request.nextUrl.searchParams.get('email')] - The email address to search for.
 */
export async function GET (request) {
  try {
    // Authenticates user
    const session = await getServerSession(options)
    if (!session) {
      return NextResponse.json({ success: false, message: 'authentication failed' }, { status: 401 })
    }

    const params = await request.nextUrl.searchParams

    const id = params.get('id')
    const email = params.get('email')

    // Require firstName and lastName
    if (!id && !email) {
      return NextResponse.json({ message: 'User id or email required.' }, { status: 400 })
    }

    const users = await getUsers(id, email)

    return NextResponse.json({ users }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error getting data ' + error }, { status: 500 })
  }
}
