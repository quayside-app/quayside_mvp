import { NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST (request) {
  console.log(process.env.QUAYSIDE_API_KEY) // remove later

  // magically getting the user form data from NewProjectModal form
  const params = await request.json()
  const userAPIKey = params.apiKey
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
        content: 'Given the user prompt, list its subtasks and subtask\'s subtasks, etc... in a tree structure starting from 1, and going deeper with 1.1, 1.1.1, 1.2, 1.2.2, etc.' +
                 'Ensure every task and subtask has 5 or less children tasks. Keep the subtasks directly related to the user input task.'
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
