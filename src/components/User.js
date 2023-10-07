import mongoose from 'mongoose';



async function getData() {
    //const { db } = await connectToDatabase();
    const username = process.env.MONGO_USERNAME;
    const password = process.env.MONGO_PASSWORD;

    const uri = `mongodb://${username}:${password}@quayside-cluster.ry3otj1.mongodb.net/?retryWrites=true&w=majority`;

    await mongoose.connect(uri);

    
    //const data = await db.collection('User').findOne({});
  
    //return JSON.parse(JSON.stringify(data));
    return "Connected to DB!"
}


export default async function DataDisplay() {
    const data = await getData()
   
    return (
        <div>
          <h1>Dis User:</h1>
          <pre>{/*JSON.stringify(data, null, 2)*/} hey</pre>
        </div>
      );
}


