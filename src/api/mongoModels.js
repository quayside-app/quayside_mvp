import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: Number,
    firstName: String,
    lastName: String,
});
export const User = mongoose.model('User', userSchema, 'User');

const projectSchema = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    objectives: [String],  // Array of Strings
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
    sponsorIDs: [ObjectId], 
    contributorIDs: [ObjectId], 
    completionRequirements: [String], 
    qualityAssurance: [String], 
    KPIs: [String], 
    otherProjectDependencies: [ObjectId], 
    informationLinks: [String],
    completionStatus: String,
    teams: [ObjectId],

});
export const Project = mongoose.model('Project', projectSchema, 'Project');

