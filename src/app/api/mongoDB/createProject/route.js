import mongoose from 'mongoose';
import { NextResponse } from "next/server";
import {Project, User} from '../mongoModels';
import {URI} from '../mongoData.js';


export async function POST(request) {
  // mongoose.mongo.ObjectId('652899f7cf31af98af5c27eb')
  try {
    const params = await request.json();

    if (!params.name) {
      return NextResponse.json({ message: "Project name required." }, { status: 400 });
    }

    if (!Array.isArray(params.userIDs)) {
      return NextResponse.json({ message: "Project users required" }, { status: 400 });
    }

    if (mongoose.connection.readyState !== 1) await mongoose.connect(URI);


    for (let i in params.userIDs) {
      const userExists = await User.exists({_id: params.userIDs[i]}); 

      if (! userExists) {
        return NextResponse.json({ message: `User ${params.userIDs[i]} doe not exist.` }, { status: 400 });
      }
    }

    // TODO: handle errors in any of the below
    await Project.create({ 
      name: params.name,   // Required
      userIDs: params.userIDs,  // Required

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
      completionStatus: params.completionStatus || "",
      
      teams: params.teams || [],
    });

    return NextResponse.json({ message: "Project stored successfully" }, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ message: 'Error storing data ' + error }, { status: 500 });
  }
}
