'use client'
import React, { useEffect, useRef, useState } from 'react'
import cytoscape from 'cytoscape'
import cxtmenu from 'cytoscape-cxtmenu'
import cydagre from 'cytoscape-dagre'
cytoscape.use(cxtmenu)
cytoscape.use(cydagre)
import xIcon from '../../public/svg/x.svg'
import Image from 'next/image'

const Modal = ({ show, onClose, onSubmit, children }) => {
  if (!show) return null


  return (
    <div className='fixed inset-0 z-40 bg-gray-500 bg-opacity-75' >
      <div className='relative rounded-lg shadow bg-black m-64 p-4'>
      <button type='button' onClick={onClose} className='absolute top-3 right-3 rounded-lg w-8 h-8 inline-flex justify-center items-center hover:bg-gray-600'>
        <Image src={xIcon} alt='exit' width='10' height='10' />
      </button>
        <div className='p-2 text-xl font-bold '>Edit Task</div>
        <div className='p-2'>
        
        {children}
        </div>
        <div className='flex w-full my-3 justify-center'>
          <button onClick={onSubmit} className="mx-2 px-10 py-2 text-white bg-gray-700 hover:bg-blue-800 rounded-lg text-md  text-center">Submit</button>
        </div>
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
            "shape": "round-rectangle",
            "width": 1500,
            'height': 'label',
            'background-color': '#262626',
            'text-valign': 'center',
            "label": 'data(label)',
            'text-wrap': 'wrap',
            'text-max-width': 1500,
            "padding": 75,
            "color": 'white',
            'font-size': 80, // Adjust font size as needed
            "border-color": 'white',
            "border-width": '10px'
         
          }
        },
        {
          selector: 'edge',
          style: {
            "curve-style": 'haystack',
            'line-color': 'white',
            'taxi-turn-min-distance': "50px",
            "taxi-turn": "1000px",
            'width': 10
          }
        }
      ],
      layout: {
        name: 'dagre',
        spacingFactor: 1.4,
        padding: 10,
        directed: true,
        avoidOverlap: true,
        levelSpacing: 50,
        rankDir: 'LR',
        nodeSep: 50,
        rankSep: 150

      },
      minZoom: 0.08, // Minimum zoom level (e.g., 0.5 means the graph can be zoomed out to half its original size)
      maxZoom: 1, // Maximum zoom level (e.g., 2 means the graph can be zoomed in to twice its original size)
      wheelSensitivity: 0.1,
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
    });
    function assignDepth(rootId) {
      let queue = [{ id: rootId, depth: 0 }];
  
      while (queue.length > 0) {
          let { id, depth } = queue.shift();
          let node = cy.getElementById(id);
  
          // Set custom data
          node.data('depth', depth);
  
          // Get connected nodes and add them to the queue
          let connectedNodes = node.connectedEdges().targets().filter(n => n.data('depth') === undefined);
          connectedNodes.forEach(n => queue.push({ id: n.id(), depth: depth + 1 }));
      }
    }
    let first = cy.nodes().first().id();
    assignDepth(first);
    function getColorForDepth(depth) {
      // Simple example: increasing shades of blue
      let colors = ['#262626', '#262626', '#262626', '#262626', '#262626'];
      return colors[depth % colors.length];
    }

    cy.style().selector('node').style({
      'background-color':function(node){
        return getColorForDepth(node.data('depth'));
      }
    })
    
    cy.autolock(true);
  }, [tasks])



  return (
    <div className={className}>
  <div ref={containerRef} style={{ width: '100%', height: '100%'}} />

      <Modal show={modalOpen} onClose={handleCloseModal} onSubmit={handleSubmitModal}>
        <input type='text' value={editLabel} onChange={(e) => setEditLabel(e.target.value)} className="rounded-lg w-full text-black p-4" />
      </Modal>

    </div>
  )
}

export default TreeGraph
