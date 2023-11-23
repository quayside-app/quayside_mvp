### Quayside

Welcome to our Quayside MVP. The tech stack for this is the MERN framework (Mongo DB, Express.js, React Next.js, and Node.js). This will be hosted on Google Cloud Services.

## Setup
You need to install npm (you can do this by installing [Node.js](https://nodejs.org/en/download)). Once that is done, run `npm install` in this directory to install all the requirements.

For accessing the mongo database locally, you will need the following generated database Atlas creds in an `.env.local` file (fyi, these creds are different than your creds to login to Mongo Atlas). In the same file you will also ned your oath creds(for google and github as examples). You will also need your chatGPT key. Here is the format:

```bash
MONGO_USERNAME=<your username>
MONGO_PASSWORD=<your password>

NEXTAUTH_SECRET=<secret>

GITHUB_SECRET=<github secret>
GITHUB_ID=<github ID>

GOOGLE_CLIENT_SECRET=<google secret>
GOOGLE_CLIENT_ID=<google client ID>

QUAYSIDE_API_KEY=<ChatGPT key>
```

## Usage

First, run `npm run dev' to start the development server.


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Edit! When you're ready to commit or make a PR, run `npx standard --fix` to check JavaScript formatting. It should automatically make most changes for you but may prompt you to make some yourself.

If you add any other dependencies, please do it by running `npm install --save <my-dependency>` so it is added to package.json for the next person to install. Otherwise, add the package manually to package.json


## Resources
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

