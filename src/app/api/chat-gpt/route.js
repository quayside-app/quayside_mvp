import { NextResponse } from 'next/server'
import { options } from '../auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

import OpenAI from 'openai'


export async function getData(userPrompt) {
  const userAPIKey = process.env.QUAYSIDE_API_KEY;
  if (!userAPIKey) {
    return NextResponse.json({ message: 'API key is required' }, { status: 400 })
  }

  const openai = new OpenAI({
    apiKey: userAPIKey
  })

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        // set the tone of the response you get back
        role: 'system',
        content: 'You are given as input a project or task that a single person or a team wants to take on.' +
        'Divide the task into less than 5 subtasks and list them hierarchically in the format where task 1 has subtasks 1.1, 1.2,...' +
        'and task 2 has subtasks 2.1, 2.2, 2.3,... and so forth' +
        'Make sure that every task is on one line after the number, NEVER create new paragraphs within a task or subtask.'
      },
      {
        // here is where the user prompt gets used
        role: 'user',
        content: userPrompt
      }
    ],
    temperature: 0,
    max_tokens: 1024,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0
  })

  const responseString = response.choices[0].message.content
  console.log(responseString)
  const newTasks = []

    // Split the input string into an array of lines. ATTENTION! THIS REQUIRES THE CHATGPT RESPONSE TO PRINT ONE LINE PER TASK/SUBTASK
    const lines = responseString.split('\n')

    let currentTaskId = null
    // Loop through the lines and extract tasks
    for (let i = 0; i < lines.length; i++) {
      // for every line,
      const line = lines[i]
      const primaryMatch = line.match(/^(\d+)\.\s(.+)/) // this checks for this structure: 1. <tasktext>
      const subtaskMatch = line.match(/^\s+(\d+\.\d+\.?)\s(.+)/) // this checks for this structure: 1.2 <subtasktext> or 1.2. <subtasktext>

      if (primaryMatch) {
        const taskNumber = primaryMatch[1]
        const taskText = primaryMatch[2]
        currentTaskId = taskNumber

        // making the 1st layer deep of tasks into a dictionary
        newTasks.push({
          id: taskNumber,
          name: taskText,
          parent: 'root', // this should be replaced by the user prompt
          subtasks: []

        })
        console.log('Parsed task', taskNumber, ':', taskText)
      } else if (subtaskMatch) {
        const subtaskNumber = subtaskMatch[1]// .replace('.', '_'); // Convert 1.1 to 1_1
        const subtaskText = subtaskMatch[2]

        // Find the parent task
        const parentTask = newTasks.find(task => task.id === currentTaskId)

        // If the parent task is found, push the subtask into its subtasks array
        if (parentTask) {
          parentTask.subtasks.push({
            id: subtaskNumber,
            name: subtaskText,
            parent: currentTaskId
          })
          console.log('Parsed subtask', subtaskNumber, ':', subtaskText)
        }
      }
    }
    console.log('Full dictionary:', newTasks)
    return newTasks;

}

export async function POST (request) {
  try {
    const params = await request.json()
    const userPrompt = params.prompt

    const newTasks = getData(userPrompt);

    return NextResponse.json({newTasks}, { status: 500 })
  } catch (error) {
    return NextResponse.json({ message: 'Error calling ChatGPT:' + error }, { status: 500 })
  }

}


