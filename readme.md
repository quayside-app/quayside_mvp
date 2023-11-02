Welcome to our Quayside MVP. The tech stack for this is the MERN framework (Mongo DB, Express.js, React Next.js, and Node.js). This will be hosted on Google Cloud Services.

## Setup
You need to install npm (you can do this by installing [node.js](https://nodejs.org/en/download)). Once that is done, run `npm install` in this directory to install all the requirements.

for adding the oauth creds (for google and github as examples) use the following format
```
#for the authentication JWT
NEXTAUTH_SECRET=<secret>
#Github secret for OAuth (setup through http://github.com/settings/apps)
#need to chnage to domain name after testing is good
GITHUB_SECRET=<github secret>
GITHUB_ID=<github ID>

GOOGLE_CLIENT_SECRET=<google secret>
GOOGLE_CLIENT_ID=<google client ID>
```
## Usage

First, run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

If you add any other dependencies, please do it by running `npm install --save <my-dependency>` so it is added to package.json for the next person to install. Otherwise, add the package manually to package.json


## Resources
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

