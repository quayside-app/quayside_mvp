import { options } from '../../auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { Project, Task } from '../mongoModels'
import { URI } from '../mongoData.js'


export async function DELETE (request) {
    try {
      const session = await getServerSession(options)
      if (!session) {
        return NextResponse.json({ success: false, message: 'authentication failed' }, { status: 401 })
      }

      const params = await request.nextUrl.searchParams
      const projectID = params.get('projectID')

      console.log("HERE", projectID);

      if (mongoose.connection.readyState !== 1) await mongoose.connect(URI);
      await Task.deleteMany({ projectID: projectID });

      await Project.deleteOne({ _id: projectID });

      console.log("DELETED everything!")

      return NextResponse.json({message: 'Project deleted successfully'}, { status: 200 })
    } catch (error) {
      return NextResponse.json({ message: 'Error deleting project ' + error }, { status: 500 })
    }
  }
  