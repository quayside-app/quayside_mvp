import {NextResponse} from "next/server";
import OpenAI from "openai";

export async function POST(request) {
    const openai = new OpenAI({
        // for now, made a .env file under quayside_mvp and added OPENAI_API_KEY = "<KEY>"
        apiKey: process.env.OPENAI_API_KEY 
    })

    const params = await request.json();

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            {
                // set the tone of the response you get back
                role: "system",
                content: "break this task down into 3 subtasks"
            },
            {
                // here is where the frontend passes the question to
                role: "user",
                content: "raising a frog" // temporarily hardcoded
            }
        ],
        temperature: 0,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
    
    
    return NextResponse.json(response);

}