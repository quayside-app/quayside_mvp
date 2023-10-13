import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
});

// The mongoose.models.User prevents errors on refresh when editing 
export const User = mongoose.models.User || mongoose.model('User', userSchema, 'User');

const projectSchema = new mongoose.Schema({
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
// The mongoose.models.Project prevents errors on refresh when editing 
export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema, 'Project');

