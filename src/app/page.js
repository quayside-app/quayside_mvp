'use client'


// import Image from 'next/image' //'Image' is defined but never used. (no-unused-vars)
// import { useState } from 'react' //'useState' is defined but never used. (no-unused-vars)
// import cookieCutter from 'cookie-cutter' //'cookieCutter' is defined but never used. (no-unused-vars)
import TreeGraph from '../components/Graph'
export default function Home () {
  return (
    <main className='flex flex-wrap w-full flex-col items-center'>
      <div className='flex w-full flex-wrap items-center'>
        {/* <div>{cookieCutter.get('description')} </div> */}
        <div className='w-full'><TreeGraph /></div>

        {/* <button
          onClick={async () => {
            const response = await fetch("/api/chat-gpt", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                someData: true,
              }),
            });
            console.log("RESPONSE", response)
            const result = await response.json();
            setChoices(result.choices) //then display choice.message.content on the screen for each choice in choices by choice index
          }}
        >
          API BUTTON!
        </button>
        {choices.map(choice => {
          return (
            <p key={choice.index}>{choice.message.content}</p>
          )
        })} */}
      </div>
    </main>
  )
}
