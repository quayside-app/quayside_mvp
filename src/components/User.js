import { connectToDatabase } from '../app/mongo';


async function getData() {
    const { db } = await connectToDatabase();
  
    const data = await db.collection('User').findOne({});
  
    return JSON.parse(JSON.stringify(data));
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


