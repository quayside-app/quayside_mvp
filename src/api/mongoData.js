
const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

export const URI = `mongodb+srv://${username}:${password}@quayside-cluster.ry3otj1.mongodb.net/quayside?retryWrites=true&w=majority`;