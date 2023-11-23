'use client'
import TreeGraph from '../../components/Graph'
import Button from '../../components/Button'
import { useRouter } from 'next/navigation';

/**
 * Renders a page component that displays the tree graph with a dynamic route
 *
 * @param {Object} props - The props passed to the page component.
 * @param {Object} props.params - The route parameters object.
 * @param {string} props.params.projectIds - The IDs of the project.
 * @returns {ReactElement} A React element that represents the page, displaying
 *                         the project IDs and a TreeGraph component for the project.
 */
export default function page ({ params }) {
  const router = useRouter();
  async function deleteProject(projectID, router) {
    await fetch(`/api/mongoDB/deleteProject?projectID=${projectID}`, {
      method: 'DELETE'
    }).catch(error => console.error('Error:', error));
    router.push('/');
  }
  return (
    <div className='p-4 text-xl flex w-full flex-wrap'>

      <div className='flex w-full'>
        <div className='flex w-11/12'> Project: {params.projectIds} </div>
        <div className='flex w-1/12 justify-end'>
          {/* On click, delete project, return to home page, and refresh */}
          <Button label='Delete Project' clickAction={() => {deleteProject(params.projectIds, router)}} className="bg-red-800 " isCentered="true"/>
        </div>
      </div>

      <TreeGraph projectID={params.projectIds} className='flex w-full' />
    </div>
  )
}
