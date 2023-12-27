import { Task } from '../mongoModels'

/**
 * Creates and stores a new task in the database. This function can be used server side.
 * Alternatively the POST request in the route.js should be used on client side (which uses this logic).
 *
 * @param {string} taskId - The ObjectID of the task. Required.
 * @param {string} name - The name of the task.
 * @param {string} description - The description of the task.
 * @param {string} startDate - The startDate of the task.
 * @param {string} endDate - The endDate of the task.
 * @param {[string]} contributorIDs - The contributor IDs of the task.
 * @param {[string]} contributorEmails - The contributor emails of the task. NOTE: you can not have
 *  these AND contributorIDs.
 * @returns {Promise<Object>} - A promise that resolves to the newly created task object.
 *
 * @example
 * // Example of using editTask function
 * const task = await editTask('65627e3f0deac40cffab844c', 'Develop New Feature');
 *
 */
export async function editTask (taskId, name, description, startDate, endDate) {
  try {
    // Find the task by its ObjectId and update its name
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { name: name ,
        description: description,
        startDate: startDate,
        endDate: endDate
      },
      { new: true } // Return the updated document
    )

    if (!updatedTask) {
      throw new Error('Task not found')
    }

    return updatedTask
  } catch (error) {
    console.error('Error updating task:', error)
    throw error; // Re-throw the error for handling at a higher level
  }
}
