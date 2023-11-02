import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
    //configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB.SECRET as string,
        }),
        /* setup our own signin for MongoDB
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username:",
                    type: "text",
                    placeholder: "your-username"
                },
                password: {
                    label: "Password",
                    type: "password"
                    placeholder: "your-password"
                }
            },
            async authorize(credentials) {
                this is where you need to retrieve user data
                to verify credintials
                Docs: https://next-auth.js.org/providers/credentials
                THIS IS JUST TO DEMONSTRATE the credentials,
                we definately would want to set up to database
                hardcoded example:
                const user = {id: "42", name: "Dave", password: "nextauth"}
                
                if (credintials?.username === user.name && credentials?.password === user.password {
                    return user
                }
                else {
                    return null
                }
                
            }
        }) */
    ],
    /*
    You can add custom sign in pages here if 
    we don't want to use the default. refer to NextAuth
    documentation here: 
    https://next-auth.js.org/configuration/options#pages
    */
    
}