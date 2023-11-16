import mongoose from 'mongoose'
import { Task} from '../mongoModels'
import { URI } from '../mongoData.js'

/**
 * Creates and stores a new task in the database. This function can be used server side.
 * Alternatively the POST request in the route.js should be used on client side (which uses this logic).
 *
 * @param {string} name - The name of the task. Required.
 * @param {string} projectID - The ID of the project associated with the task. Required.
 * @param {string} [parentTaskID=null] - The ID of the parent task, if applicable.
 * @param {string} [description=null] - A description of the task.
 * @param {Array.<string>} [objectives=[]] - An array of objectives associated with the task.
 * @param {Date} [startDate=null] - The start date of the task.
 * @param {Date} [endDate=null] - The end date of the task.
 * @param {number} [budget=null] - The budget allocated for the task.
 * @param {Array.<string>} [scopesIncluded=[]] - An array of scopes included in the task.
 * @param {Array.<string>} [scopesExcluded=[]] - An array of scopes excluded from the task.
 * @param {Array.<string>} [contributorIDs=[]] - An array of IDs of contributors to the task.
 * @param {Array.<Object>} [otherProjectDependencies=[]] - An array of other projects that this task depends on.
 * @param {Array.<Object>} [otherProjectTaskDependencies=[]] - An array of other tasks within the project that this task depends on.
 * @param {string} [completionStatus=null] - The current completion status of the task.
 * @returns {Promise<Object>} - A promise that resolves to the newly created task object.
 * @throws {Error} - Throws an error if the database connection fails or task creation encounters an error.
 * 
 * @example
 * // Example of using createTask function
 * const task = await createTask('Develop New Feature', 'proj12345');
 * 
 */
export async function createTask(name, projectID, parentTaskID=null, description=null, objectives = [], 
    startDate=null, endDate=null, budget=null, scopesIncluded=[], scopesExcluded=[], contributorIDs=[], 
    otherProjectDependencies=[], otherProjectTaskDependencies=[], completionStatus=null) {

    if (mongoose.connection.readyState !== 1) await mongoose.connect(URI);

    const task = await Task.create({
        name: name,  // Required
        projectID: projectID,  // Required
        parentTaskID: parentTaskID,
        description: description,
        objectives: objectives,
        startDate: startDate,
        endDate: endDate,
        budget: budget,
        scopesIncluded: scopesIncluded,
        scopesExcluded: scopesExcluded,
        contributorIDs: contributorIDs,
        otherProjectDependencies: otherProjectDependencies,
        otherProjectTaskDependencies: otherProjectTaskDependencies,
        completionStatus: completionStatus,
    })

    return task;
}
