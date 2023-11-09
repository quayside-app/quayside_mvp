'use client'
import React, { useEffect, useRef, useState } from 'react'
import cytoscape from 'cytoscape'
import { useApiResponse } from '@/app/ApiResponseContext'

/**
 * A component that fetches task data and renders it as a tree graph using the Cytoscape.js library.
 *
 * @returns {React.Element} The rendered tree graph within a div element.
 *
 * @example
 * // Importing the component
 * import TreeGraph from './TreeGraph';
 *
 * // Using the component
 * <TreeGraph />
 */
function TreeGraph () {
  // Fetch Tree data
  const [tasks, setTasks] = useState(null)

  const containerRef = useRef(null)
  const { apiResponse } = useApiResponse()

  useEffect(() => {
    const projectID = '65256c7adec443373f9bf10e' // TODO
    // Fetch Tree data
    fetch(`/api/mongoDB/getTasks?projectID=${projectID}`, {
      method: 'GET'
    }).then(async (response) => {
      const body = await response.json()
      if (!response.ok) {
        console.error(body.message)
      } else {
        setTasks(body.tasks || [])
      }
    }).catch(error => {
      console.error('Error getting Tree Task data:', error)
    })

    // CHATGPT STUFF, NEEDS TO GO TO ROUTE
    // if there is no API response, just return
    if (!apiResponse) return

    // parse the result
    const responseString = apiResponse[0].message.content
    console.log('Response String:', responseString)
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
    setTasks(newTasks)
    console.log('Full dictionary:', newTasks)
  }, [apiResponse]) // having apiResponse there means that this component gets activated only when apiResponse changes
  //END OF CHATGPT STUFF

  useEffect(() => {
    if (!tasks) return // Ensure tasks is not null before proceeding

    const elements = []

    tasks.forEach(task => {
      console.log(task._id)
      console.log(task.parentTaskID)
      // Assume task has id, name, and parent fields
      elements.push({
        data: { id: task._id, label: task.name }
      })

      // If the task has a parent, create an edge
      if (task.parentTaskID) {
        elements.push({
          data: { id: task._id + '-' + task.parent, source: task.parentTaskID, target: task._id }
        })
      }
    })

    // console.log(elements);

    // Tailwind's bg-gray-200 #E5E7EB
    cytoscape({

      container: containerRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            width: '1000', // Adjusts width based on label
            height: '800', // Set a fixed height
            'background-color': 'black',
            'text-valign': 'center',
            label: 'data(label)',
            'text-wrap': 'wrap',
            'text-max-width': 500,
            padding: '30px',
            color: 'white', // Tailwind's text-gray-900
            'font-size': 100,
            'border-width': 10,
            'border-color': '#FFFFFF'
          }
        },
        {
          selector: 'edge',
          style: {
            curveStyle: 'bezier',
            'line-color': 'white', // Tailwind's border-gray-300 #D1D5DB
            width: 10,
            targetArrowShape: 'triangle',
            'target-arrow-color': 'white' // Tailwind's border-gray-300
          }
        }
      ],
      layout: {
        name: 'breadthfirst',
        spacingFactor: 1.3,
        padding: 4,
        directed: true
      }
    })
  }, [tasks])

  return (
    <div style={{ width: '800px', height: '800px' }}>
      <div ref={containerRef} style={{ width: '100%', height: '800px' }} />
    </div>
  )
}

export default TreeGraph
