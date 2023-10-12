/**
 * Graph Component
 *
 * This component uses the cytoscape library to implement a graph that will be rendered
 * inside of our webapp. To learn more about cytoscape https://cytoscape.org/
 * This will eventually need to dynamically generate the graph based
 * off of the API response
 *
 *
 * Usage:
 * <div><TreeGraph /></div>
 *
 */
'use client';
import React, { useEffect, useRef } from 'react'
import cytoscape from 'cytoscape'
import { useApiResponse } from '@/app/ApiResponseContext'
/**
 * Renders a tree graph using the Cytoscape library.
 *
 * @return {JSX.Element} The rendered tree graph.
 */

function TreeGraph () {
  const containerRef = useRef(null)
  const { apiResponse } = useApiResponse()

  useEffect(() => {
    if (!apiResponse) return
    if (apiResponse) {
      console.log('help')
      console.log(apiResponse[0].message.content)
    }
    // Convert the apiResponse into tasks or use it as needed.

    const tasks = [
      { id: 'root', name: 'Make Vanilla Ice Cream', parent: 'none' },

      { id: 'step1', name: 'Gather Ingredients', parent: 'root' },
      { id: 'step1_1', name: '2 cups of heavy cream', parent: 'step1' },
      { id: 'step1_2', name: '1 cup of whole milk', parent: 'step1' },
      { id: 'step1_3', name: '3/4 cup granulated sugar', parent: 'step1' },
      { id: 'step1_4', name: '1 tablespoon pure vanilla extract', parent: 'step1' },
      { id: 'step1_5', name: 'Pinch of salt', parent: 'step1' },

      { id: 'step2', name: 'Mix Ingredients', parent: 'root' },
      { id: 'step2_1', name: 'Combine sugar and salt in a bowl', parent: 'step2' },
      { id: 'step2_2', name: 'Add heavy cream and milk', parent: 'step2' },
      { id: 'step2_3', name: 'Whisk until sugar is dissolved', parent: 'step2' },
      { id: 'step2_4', name: 'Stir in vanilla extract', parent: 'step2' },

      { id: 'step3', name: 'Churn in Ice Cream Maker', parent: 'root' },
      { id: 'step3_1', name: 'Pour mixture into an ice cream maker', parent: 'step3' },
      { id: 'step3_2', name: 'Churn according to manufacturer’s instructions', parent: 'step3' },

      { id: 'step4', name: 'Freeze', parent: 'root' },
      { id: 'step4_1', name: 'Transfer ice cream to a lidded container', parent: 'step4' },
      { id: 'step4_2', name: 'Freeze for at least 4 hours', parent: 'step4' },

      { id: 'step5', name: 'Serve and Enjoy', parent: 'root' }
    ]

    const elements = []

    tasks.forEach(task => {
      // Add nodes for each task
      elements.push({
        data: { id: task.id, label: task.name }
      })

      // If the task has a parent, create an edge
      if (task.parent && task.parent !== 'none') {
        elements.push({
          data: { id: task.id + '-' + task.parent, source: task.parent, target: task.id }
        })
      }
    })

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
  }, [apiResponse])

  return <div ref={containerRef} style={{ width: '100%', height: '800px' }} />
}

export default TreeGraph
