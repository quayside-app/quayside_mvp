import mongoose from 'mongoose'
import { User } from '../api/mongoModels'
import { URI } from '../api/mongoData.js'

async function getName () {
  try {
    // Connect if not connected already
    if (mongoose.connection.readyState !== 1) await mongoose.connect(URI)

    let data = await User.findOne({ firstName: 'Mya' })
    // await mongoose.disconnect();
    if (data) {
      data = data.firstName + ' ' + data.lastName
    }
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}

export default async function DataDisplay () {
  const name = await getName()

  return (
    <div>
      <div>User: {name}</div>
    </div>
  )
}
