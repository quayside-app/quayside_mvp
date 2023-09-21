"use client";

import Image from 'next/image'
import { useState } from 'react';
import cookieCutter from 'cookie-cutter'
import TreeGraph from '../components/Graph';
export default function Home() {

  const [choices, setChoices] = useState([]); // for rendering API response

  return (
    <main className="flex flex-wrap w-full flex-col items-center">
      <div className="flex w-full flex-wrap items-center">
        {/* <div>{cookieCutter.get('description')} </div> */}
        <div className='w-full'><TreeGraph/></div>

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
            setChoices(result.choices)
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
  );
}
