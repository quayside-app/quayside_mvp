'use client'
import React, { useEffect, useRef, useState } from 'react'
import cytoscape from 'cytoscape'
import cxtmenu from 'cytoscape-cxtmenu'
import cydagre from 'cytoscape-dagre'
cytoscape.use(cxtmenu)
cytoscape.use(cydagre)

const Modal = ({ show, onClose, onSubmit, children }) => {
  if (!show) return null

  const modalContentStyle = {
    width: '30%', // Adjust the width of the modal as per your requirement
    minWidth: '300px', // Minimum width to ensure responsiveness
    marginTop: '20px', // Margin from the top to push the modal down a bit
    backgroundColor: 'grey', // Background color of the modal
    padding: '20px', // Padding inside the modal
    borderRadius: '5px', // Rounded corners of the modal
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Box shadow for a subtle depth effect
    display: 'flex', // Use flex layout
    flexDirection: 'column', // Stack children vertically
    alignItems: 'center' // Center-align children horizontally
  }

  const modalBackdropStyle = {
    position: 'fixed', // Fixes the backdrop in relation to the viewport
    top: 0, // Aligns the top edge of the backdrop with the top of the viewport
    left: 0, // Aligns the left edge of the backdrop with the left of the viewport
    right: 0, // Aligns the right edge of the backdrop with the right of the viewport
    bottom: 0, // Aligns the bottom edge of the backdrop with the bottom of the viewport
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    display: 'flex', // Uses flexbox layout
    justifyContent: 'center', // Centers children horizontally
    alignItems: 'flex-start', // Aligns children to the start of the cross axis, i.e., top
    paddingTop: '50px' // Adds padding at the top
  }

  return (
    <div className='modal-backdrop' style={modalBackdropStyle}>
      <div className='modal-content' style={modalContentStyle}>
        {children}
        <button onClick={onSubmit} style={{ padding: '10px', marginRight: '5px' }}>Submit</button>
        <button onClick={onClose} style={{ padding: '10px', marginRight: '5px' }}>Cancel</button>
      </div>
    </div>
  )
}

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
function TreeGraph ({ className, projectID }) {
  // Fetch Tree data
  const [tasks, setTasks] = useState(null)
  const containerRef = useRef(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [editLabel, setEditLabel] = useState('')
  const [editNode, setEditNode] = useState(null)

  const updateTextInMongoDB = async (taskId, newText) => {
    try {
      const response = await fetch('/api/mongoDB/editTask', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ taskId, newName: newText })
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('Failed to update:', result.message)
        // Handle error feedback to user
      } else {
        console.log('Text updated successfully in MongoDB.')
        // Handle success feedback to user
      }
    } catch (error) {
      console.error('Error updating text in MongoDB:', error)
      // Handle error feedback to user
    }
  }

  // Function to handle the edit command
  const handleEdit = (node) => {
    setEditNode(node)
    setEditLabel(node.data('label'))
    setModalOpen(true)
  }

  // Function to close the modal
  const handleCloseModal = () => {
    setModalOpen(false)
  }

  // Function to submit the new label
  const handleSubmitModal = () => {
    setModalOpen(false)
    const nodeId = editNode.id()
    const newText = editLabel
    updateTextInMongoDB(nodeId, newText)
    editNode.data('label', newText)
    setEditNode(null)
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

    // Tailwind's bg-gray-200 #E5E7EB
    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            shape: 'roundrectangle',
            width: 1500,
            height: 'label', // Use the 'label' keyword to dynamically size the width based on the label
            'background-color': 'black',
            'text-valign': 'center',
            label: 'data(label)',
            'text-wrap': 'wrap',
            'text-max-width': 1500,
            padding: 75,
            color: 'white',
            'font-size': 50, // Adjust font size as needed
            'border-width': 10,
            'border-color': '#FFFFFF'
          }
        },
        {
          selector: 'edge',
          style: {
            // 'curve-style': 'unbundled-bezier',
            // 'control-point-distances': 100, // Sharpness of the bend
            // 'control-point-weights': 0.5, // Position of the control point along the edge (0.5 is halfway)
            'line-color': 'white',
            width: 10,
            targetArrowShape: 'triangle',
            'target-arrow-color': 'white' // Tailwind's border-gray-300
          }
        }
      ],
      layout: {
        name: 'dagre',
        spacingFactor: 1.5,
        padding: 10,
        directed: true,
        avoidOverlap: true,
        levelSpacing: 50,
        rankDir: 'LR',
        nodeSep: 50,
        rankSep: 150
      },
      minZoom: 0.15, // Minimum zoom level (e.g., 0.5 means the graph can be zoomed out to half its original size)
      maxZoom: 0.5 // Maximum zoom level (e.g., 2 means the graph can be zoomed in to twice its original size)
    })

    // creates context radial menu around each node
    cy.cxtmenu({
      // adjust radius menu
      menuRadius: function (ele) { return 70 },
      selector: 'node',
      commands: [
        {
          content: 'Add Child',
          select: function (ele) {
            console.log('Add Child clicked for node ' + ele.id())
            // Add logic to handle adding a child node
          }
        },
        {
          content: 'Edit',
          select: function (ele) {
            handleEdit(ele)
          }
        },
        {
          content: 'Delete',
          select: function (ele) {
            console.log('Delete clicked for node ' + ele.id())
            // Add logic to handle deleting the node
          }
        },
        {
          content: 'Expand',
          select: function (ele) {
            console.log('Expand clicked for node ' + ele.id())
            // Add logic to handle expanding node
          }
        }
        // ... [more commands as needed]
      ]
    })
  }, [tasks])

  const inputStyle = {
    color: 'black', // Set font color to black
    padding: '10px', // Optional: Add padding for better appearance
    margin: '5px 0', // Optional: Add some margin for spacing
    width: '100%' // Optional: Set width to fill the modal
    // Add any other styles you need for the input
  }

  return (
    <div className={className}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
      <Modal show={modalOpen} onClose={handleCloseModal} onSubmit={handleSubmitModal}>
        <input type='text' value={editLabel} onChange={(e) => setEditLabel(e.target.value)} style={inputStyle} />
      </Modal>
    </div>
  )
}

export default TreeGraph
