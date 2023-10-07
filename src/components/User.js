import mongoose from 'mongoose';
import {User} from '../api/mongoModels';

async function getData() {
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;

    const uri = `mongodb+srv://${username}:${password}@quayside-cluster.ry3otj1.mongodb.net/quayside?retryWrites=true&w=majority`;
    try {
      await mongoose.connect(uri);
      const data = await User.findOne({firstName: 'Fred'});
      await mongoose.disconnect();
      return data;
  } catch (error) {
      console.error('Error fetching data:', error);
      return null;
  }
}

export default async function DataDisplay() {
    const data = await getData()
   
    return (
        <div>
          <h1>Dis User:</h1>
          <div>{JSON.stringify(data, null, 2)}</div>
        </div>
      );
}


