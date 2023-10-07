import mongoose from 'mongoose';
import {User} from '../api/mongoModels';

async function getData() {
    //const { db } = await connectToDatabase();
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;

    const uri = `mongodb+srv://${username}:${password}@quayside-cluster.ry3otj1.mongodb.net/?retryWrites=true&w=majority`;

    await mongoose.connect(uri);

    const data = await User.findOne({firstName: 'Fred'});

    await mongoose.disconnect();

    
    //const data = await db.collection('User').findOne({});
  
    //return JSON.parse(JSON.stringify(data));
    return data;
}


export default async function DataDisplay() {
    const data = await getData()
   
    return (
        <div>
          <h1>Dis User:</h1>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      );
}


