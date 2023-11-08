import mongoose from 'mongoose'
import { NextResponse } from 'next/server'
import { options } from '../../auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

import { User } from '../mongoModels'
import { URI } from '../mongoData.js'

/**
 * Handles a GET request to retrieve users based on the provided first name and last name.
 *
 * @param {Object} request - The request object containing query parameters.
 * @returns {Object} - A response object with a status code and the retrieved users or an error message.
 *
 * @throws Will throw an error if either first name or last name is missing, if there's an issue connecting to the database,
 * or if the user is not authenticated.
 *
 * @example
 * // Example usage:
 * fetch(`/api/mongoDB/getUsers?firstName=John&lastName=Doe`, {
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
 * @property {string} request.nextUrl.searchParams.firstName - The first name of the user(s) to be retrieved.
 * @property {string} request.nextUrl.searchParams.lastName - The last name of the user(s) to be retrieved.
 */

export async function GET (request) {
  try {
    // Authenticates user
    const session = await getServerSession(options)
    if (!session) {
      return NextResponse.json({ success: false, message: 'authentication failed' }, { status: 401 })
    }

    const params = await request.nextUrl.searchParams
    const firstName = params.get('firstName')
    const lastName = params.get('lastName')

    // Require firstName and lastName
    if (!firstName || !lastName) {
      return NextResponse.json({ message: 'User first name and last name required.' }, { status: 400 })
    }

    if (mongoose.connection.readyState !== 1) await mongoose.connect(URI)

    const users = await User.find({ firstName, lastName })
    return NextResponse.json({ users }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error getting data ' + error }, { status: 500 })
  }
}
