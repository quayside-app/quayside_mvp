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
function TreeGraph ({ projectID }) {
  // Fetch Tree data
  const [tasks, setTasks] = useState(null)

  const containerRef = useRef(null)
  const { apiResponse } = useApiResponse()
  if (!projectID) {
    projectID = '65256c7adec443373f9bf10e' // TODO
  }

  useEffect(() => {
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
  }, [])


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
