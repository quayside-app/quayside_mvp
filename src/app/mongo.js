// import { MongoClient } from 'mongodb';

// const username = process.env.MONGO_USERNAME;
// const password = process.env.MONGO_PASSWORD;

// const uri = `mongodb+srv://${username}:${password}@quayside.dezgvql.mongodb.net/?retryWrites=true&w=majority`;
// const dbName = 'quayside';

// let cachedClient = null;
// let cachedDb = null;

// export async function connectToDatabase() {
//   if (cachedClient && cachedDb) {
//     return { client: cachedClient, db: cachedDb };
//   }

//   const client = await MongoClient.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   const db = client.db(dbName);

//   cachedClient = client;
//   cachedDb = db;

//   return { client, db };
// }

//Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   console.log("HERE!");
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

