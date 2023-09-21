"use client";

import Image from 'next/image'
import { useState } from 'react';

export default function Home() {

  const [choices, setChoices] = useState([]); // for rendering API response

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p>Its our MVP!</p>

        <button
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
          Hit API
        </button>
        {choices.map(choice => {
          return (
            <p key={choice.index}>{choice.message.content}</p>
          )
        })}
      </div>
    </main>
  );
}
