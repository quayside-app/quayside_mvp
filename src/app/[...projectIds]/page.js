
import TreeGraph from '../../components/Graph'

export default function page ({params}) {
  return(<div>
    
    Project: {params.projectIds}
    <TreeGraph projectID={params.projectIds}/>


  </div>)
}
