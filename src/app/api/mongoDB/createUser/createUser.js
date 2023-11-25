import mongoose from 'mongoose'
import { User } from '../mongoModels'
import { URI } from '../mongoData.js'

/**
 * Asynchronously creates a new user in the database. This function can be used server side.
 * Alternatively the POST request in the route.js should be used on client side (which uses this logic).
 *
 * @param {string} email - The email address of the user. Required.
 * @param {string} [firstName=null] - The first name of the user. Optional, defaults to null.
 * @param {string} [lastName=null] - The last name of the user. Optional, defaults to null.
 * @param {string} [username=null] - The username for the user. Optional, defaults to null.
 * @param {Array.<string>} [teamIDs=[]] - An array of team IDs associated with the user. Optional, defaults to an empty array.
 * @returns {Promise<Object>} - A promise that resolves to the newly created user object.
 *
 * @example
 * // Example of using createUser function
 * createUser('jane.doe@example.com', 'Jane', 'Doe', 'janedoe', ['team1', 'team2'])
 *   .then(user => console.log('User created successfully:', user))
 *   .catch(error => console.error('Error in creating user:', error));
 */

export async function createUser (email, firstName = null, lastName = null, username = null, teamIDs = []) {

  if (mongoose.connection.readyState !== 1) await mongoose.connect(URI);
  const user = await User.create({
    email,
    firstName,
    lastName,
    username,
    teamIDs
  })
  return user
}
