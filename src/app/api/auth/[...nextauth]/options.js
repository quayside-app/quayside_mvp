// import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
// import Credentials from 'next-auth/providers/credentials'
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import mongoose from 'mongoose'
import { URI } from '../../mongoDB/mongoData.js'
import { User } from '../../mongoDB/mongoModels.js'

export const options = {
  // configure one or more authentication providers
  providers: [
    // github nextauth docs: https://next-auth.js.org/providers/github
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // google nextauth docs: https://next-auth.js.org/providers/google
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks:{
    async signIn({ user, account, profile }) {
        // Here you might want to create or update the user entry in your database
        // You can use either the 'account.providerAccountId' or your own database's ID
        // for the user, depending on the provider

        if (mongoose.connection.readyState !== 1) await mongoose.connect(URI);
        const existingUser = await User.findOne({ email:user.email});
        if (existingUser) {
            return true;
        }else {
            // Get first and last name
            const nameParts = user.name.split(' ');
            const firstName = nameParts[0];
            const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

            // Create User
            const newUser = await User.create({
                firstName: firstName,
                lastName: lastName,
                email: user.email,
                username: '',
                teamIDs: []
              });
              return newUser ? true : false; // Return true if creation is successful
        }
      },
      async session({ session, user, token }) {
        // Assign the user ID to the session to make it available on the client side
        session.userId = token.sub; // 'sub' is typically the field where the user ID from the provider is stored
        return session;
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        // This callback is called whenever a JWT is created. So session.userId is the mongo User _id
        if (user) {
            if (mongoose.connection.readyState !== 1) await mongoose.connect(URI)
          token.sub =  await User.findOne({email:user.email});
        }
        return token;
      },
    },

    /*
    You can add custom sign in pages here if
    we don't want to use the default. refer to NextAuth
    documentation here:
    https://next-auth.js.org/configuration/options#pages
    */
}


