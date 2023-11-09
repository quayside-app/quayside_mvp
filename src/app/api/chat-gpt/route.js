import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST (request) {
  console.log(process.env.QUAYSIDE_API_KEY) // remove later

  // magically getting the user form data from NewProjectModal form
  const params = await request.json()
  const userAPIKey = process.env.QUAYSIDE_API_KEY
  const userPrompt = params.prompt

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
        'Make sure that every task is on one line after the number, don\'t create new paragraphs'
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

  return NextResponse.json(response)
}