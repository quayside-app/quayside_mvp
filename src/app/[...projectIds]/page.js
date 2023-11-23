import TreeGraph from '../../components/Graph'
import Button from '../../components/Button'

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
  return (
    <div className='p-4 text-xl flex w-full flex-wrap'>

      <div className='flex w-full'>
        <div className='flex w-11/12'> Project: {params.projectIds} </div>
        <div className='flex w-1/12 justify-end'><Button label='Delete Project' /></div>
      </div>

      <TreeGraph projectID={params.projectIds} className='flex w-full' />
    </div>
  )
}
