import mongoose from 'mongoose'
import { User } from '../mongoModels'
import { URI } from '../mongoData.js'

/**
 * Asynchronously retrieves user(s) from the database based on the provided ID or email.
 * If an ID is provided, it retrieves the user with that specific ID. If an email is provided instead, it retrieves
 * all users with that email address. Should be only one of each, but allowed it to be multiple user in case
 * this API is expanded in the future.
 *
 * This function can be used server side.Alternatively the GET request in the route.js should be
 * used on client side (which uses this logic).
 *
 * @param {string} [id=null] - The unique ID of the user to retrieve. If provided, the function
 *                             retrieves the user with this ID. Default is null.
 * @param {string} [email=null] - The email address to search for. If provided, the function
 *                                retrieves all users with this email. Default is null.
 * @returns {Promise<Array.<Object>|null>} - A promise that resolves to an array of user objects
 *                                           if any are found, or null if no users are found or if
 *                                           neither ID nor email are provided.
 * @throws {Error} - Throws an error if the database connection fails or if the user retrieval
 *                   process encounters an error.
 *
 * @example
 * // Example of using getUsers function to retrieve a user by ID
 * getUsers('12345')
 *   .then(users => console.log('User:', users))
 *   .catch(error => console.error('Error in retrieving user:', error));
 *
 * // Example of using getUsers function to retrieve users by email
 * getUsers(null, 'user@example.com')
 *   .then(users => console.log('Users:', users))
 *   .catch(error => console.error('Error in retrieving users:', error));
 */
export async function getUsers (id = null, email = null) {
  if (mongoose.connection.readyState !== 1) await mongoose.connect(URI)

  let users = null
  if (id) {
    users = await User.find({ _id: id })
  } else if (email) {
    users = await User.find({ email })
  }
  return users
}
