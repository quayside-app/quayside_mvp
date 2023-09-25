/*
   needs to somehow output the chatgpt response
*/

import React, { useState } from 'react'

import { getResponse } from './NewProjectModal'

const ChatGPT = () => {
  const [choices, setChoices] = useState([]) // variable choices and setter setChoices

  // need to get result from newprojectmodal and set choices equal to that result
  { choices.map(choice => {
    return (
      <p key={choice.index}>{choice.message.content}</p>
    )
  }) }
}

export default ChatGPT
