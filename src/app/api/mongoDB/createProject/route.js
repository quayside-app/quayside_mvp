import mongoose from 'mongoose'
import { options } from '../../auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'
import { Project, User, Task} from '../mongoModels'
import { URI } from '../mongoData.js'
import {getData} from '../../chat-gpt/route'

/**
 * Handles a POST request to create and store a new project in the database.
 *
 * @param {Object} request - The request object containing the project details.
 * @returns {Object} - A response object with a status code and a message.
 *
 * @throws Will throw an error if any of the required fields are missing, if there's an issue connecting to the database,
 * or if not authenticated.
 *
 * @example
 * fetch(`/api/mongoDB/createProject`, {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({
 *         name: 'New Project',
 *         userIDs: ['user123', 'user456'],
 *         objectives: ['Objective 1', 'Objective 2'],
 *         // ...other optional properties
 *     }),
 * }).then(async (response) => {
 *     let body = await response.json();
 *     if (!response.ok) {
 *         console.error(body.message);
 *     } else {
 *         console.log(body);
 *     }
 * }).catch(error => console.error(error));
 *
 * @property {string} request.body.name - The name of the project. (Required)
 * @property {Array.<string>} request.body.userIDs - An array of user IDs associated with the project. (Required)
 * @property {Array.<string>} [request.body.objectives=[]] - An array of objectives for the project.
 * @property {Array.<string>} [request.body.types=[]] - An array of project types.
 * @property {Date} [request.body.startDate=null] - The start date of the project.
 * @property {Date} [request.body.endDate=null] - The end date of the project.
 * @property {number} [request.body.budget=null] - The budget allocated for the project.
 * @property {Array.<string>} [request.body.assumptions=[]] - An array of assumptions made for the project.
 * @property {Array.<string>} [request.body.scopesIncluded=[]] - An array of scopes included in the project.
 * @property {Array.<string>} [request.body.scopesExcluded=[]] - An array of scopes excluded from the project.
 * @property {Array.<Object>} [request.body.risks=[]] - An array of risks associated with the project.
 * @property {Array.<string>} [request.body.projectManagerIDs=[]] - An array of project manager IDs.
 * @property {Array.<string>} [request.body.sponsors=[]] - An array of sponsors for the project.
 * @property {Array.<string>} [request.body.contributorIDs=[]] - An array of contributor IDs.
 * @property {Array.<string>} [request.body.completionRequirements=[]] - An array of completion requirements for the project.
 * @property {Array.<Object>} [request.body.qualityAssurance=[]] - An array of quality assurance metrics.
 * @property {Array.<Object>} [request.body.KPIs=[]] - An array of Key Performance Indicators (KPIs) for the project.
 * @property {Array.<Object>} [request.body.otherProjectDependencies=[]] - An array of other project dependencies.
 * @property {Array.<string>} [request.body.informationLinks=[]] - An array of links to more information.
 * @property {string} [request.body.completionStatus=""] - The completion status of the project.
 * @property {Array.<Object>} [request.body.teams=[]] - An array of teams working on the project.
 */

export async function POST (request) {
  try {
    const session = await getServerSession(options)
    if (!session) {
      return NextResponse.json({ success: false, message: 'authentication failed' }, { status: 401 })
    }

    const params = await request.json()

    if (!params.name) {
      return NextResponse.json({ message: 'Project name required.' }, { status: 400 })
    }

    if (!Array.isArray(params.userIDs)) {
      return NextResponse.json({ message: 'Project users required' }, { status: 400 })
    }


    const chatGptResponse = await getData(params.name);

  
    if (mongoose.connection.readyState !== 1) await mongoose.connect(URI);

    for (const i in params.userIDs) {
      const userExists = await User.exists({ _id: params.userIDs[i] })

      if (!userExists) {
        return NextResponse.json({ message: `User ${params.userIDs[i]} doe not exist.` }, { status: 400 })
      }
    }

    const projectDocument = await Project.create({
      name: params.name, // Required
      userIDs: params.userIDs, // Required

      objectives: params.objectives || [],
      types: params.types || [],

      startDate: params.startDate || null,
      endDate: params.endDate || null,

      budget: params.budget || null,
      assumptions: params.assumptions || [],
      scopesIncluded: params.scopesIncluded || [],
      scopesExcluded: params.scopesExcluded || [],
      risks: params.risks || [],

      projectManagerIDs: params.projectManagerIDs || [],
      sponsors: params.sponsors || [],
      contributorIDs: params.contributorIDs || [],

      completionRequirements: params.completionRequirements || [],
      qualityAssurance: params.qualityAssurance || [],
      KPIs: params.KPIs || [],

      otherProjectDependencies: params.otherProjectDependencies || [],
      informationLinks: params.informationLinks || [],
      completionStatus: params.completionStatus || '',

      teams: params.teams || []
    })

    // Parse and create projects
    const projectId = projectDocument._id;
    async function parseTask(task, parentId, projectId) {
      //TODO: create new route for this?
      const taskDocument = await Task.create({
        parentTaskID: parentId,
        name: task.name,
        projectID: projectId
      })
      console.log("---",task)

      if (task.subtasks) {
        for (let subtask of task.subtasks) {
          parseTask(subtask, taskDocument._id, projectId);
        }
      }
    }

    const rootTaskDocument = await Task.create({
      parentTaskID: null,
      name: params.name,
      projectID: projectId
    })
    for (let task of chatGptResponse) {
      parseTask(task, rootTaskDocument._id, projectId);
    }



    return NextResponse.json({ message: 'Project and tasks created successfully' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Error creating projects and tasks:' + error }, { status: 500 })
  }

  
}
