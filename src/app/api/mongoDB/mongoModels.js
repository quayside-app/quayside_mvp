import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  username: String,
  teamIDs: [ObjectId]
})

// The mongoose.models.User prevents errors on refresh when editing
export const User = mongoose.models.User || mongoose.model('User', userSchema, 'User')

const projectSchema = new mongoose.Schema({
  name: String,
  types: [String],
  objectives: [String],
  startDate: Date,
  endDate: Date,
  budget: String,
  assumptions: [String],
  scopesIncluded: [String],
  scopesExcluded: [String],
  risks: [String],
  userIDs: [ObjectId],
  projectManagerIDs: [ObjectId],
  sponsors: [String],
  contributorIDs: [ObjectId],
  completionRequirements: [String],
  qualityAssurance: [String],
  KPIs: [String],
  otherProjectDependencies: [ObjectId],
  informationLinks: [String],
  completionStatus: String,
  teams: [ObjectId]
})
// The mongoose.models.Project prevents errors on refresh when editing
export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema, 'Project')

const taskSchema = new mongoose.Schema({
  parentTaskID: ObjectId,
  name: String,
  description: String,
  objectives: [String],
  startDate: Date,
  endDate: Date,
  budget: String,
  scopesIncluded: [String],
  scopesExcluded: [String],
  contributorIDs: [ObjectId],
  otherProjectDependencies: [ObjectId],
  otherProjectTaskDependencies: [ObjectId],
  completionStatus: String,
  projectID: ObjectId
})
// The mongoose.models.Task prevents errors on refresh when editing
export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema, 'Task')
