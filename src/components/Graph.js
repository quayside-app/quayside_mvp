'use client'
import React, { useEffect, useRef, useState } from 'react'
import cytoscape from 'cytoscape'
import cxtmenu from 'cytoscape-cxtmenu'
cytoscape.use(cxtmenu);

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
            width: '1000', // Adjusts width based on label
            height: '800', // Set a fixed height
            'background-color': 'black',
            'text-valign': 'center',
            label: 'data(label)',
            'text-wrap': 'wrap',
            'text-max-width': 900,
            padding: '50px',
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

    //creates context radial menu around each node
    cy.cxtmenu({
      //adjust radius menu
      menuRadius: function(ele){ return 70; },
      selector: 'node',
      commands: [
        {
          content: 'Add Child',
          select: function(ele){
            console.log('Add Child clicked for node ' + ele.id());
            // Add logic to handle adding a child node
          }
        },
        {
          content: 'Edit',
          select: function(ele){
            console.log('Edit clicked for node ' + ele.id());
            // Add logic to handle editing the node
          }
        },
        {
          content: 'Delete',
          select: function(ele){
            console.log('Delete clicked for node ' + ele.id());
            // Add logic to handle deleting the node
          }
        },
        {
          content: 'Expand',
          select: function(ele){
            console.log('Delete clicked for node ' + ele.id());
            // Add logic to handle expanding node
          }
        }
        // ... [more commands as needed]
      ]
    });

    // Calculate and set node dimensions based on label text
    cy.nodes().forEach(node => {
      const label = node.data('label');
      const labelWidth = 1000; // Adjust the factor based on your font and styling
      const labelHeight = label.height * 10; // Set a fixed height or adjust based on your design
  
      node.style({
        width: labelWidth + 'px',
        height: labelHeight + 'px',
      });
    });


    // Click event handler for node
    cy.on('click', 'node', function(event) {
      const clickedNode = event.target;
      const nodeId = clickedNode.id();
      console.log('Clicked node ID:', nodeId);
      
      // Prompt the user for new text (you can replace this with your own logic)
      const newText = prompt('Enter new text for the node:', clickedNode.data('label'));
  
      // Update the label data of the clicked node
      clickedNode.data('label', newText);

      // now newText needs to be in the database, id is clickedNode.id()
      //below code doesn't work yet
      updateTextInMongoDB(nodeId, newText);

    });

    const updateTextInMongoDB = async (taskId, newText) => {
      try {
        const response = await fetch(`/api/mongoDB/editTask`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ taskId: taskId, newName: newText }),
        });
    
        const result = await response.json();
    
        if (!response.ok) {
          console.error('Failed to update:', result.message);
          // Handle error feedback to user
        } else {
          console.log('Text updated successfully in MongoDB.');
          // Handle success feedback to user
        }
      } 
      
      catch (error) {
        console.error('Error updating text in MongoDB:', error);
        // Handle error feedback to user
      }
    };

  }, [tasks])

  return (
    <div className={className}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export default TreeGraph
