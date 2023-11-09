import TreeGraph from '../../components/Graph'

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
    <div>

      Project: {params.projectIds}
      <TreeGraph projectID={params.projectIds} />
    </div>
  )
}
