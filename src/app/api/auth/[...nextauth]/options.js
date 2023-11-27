import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { getUsers } from '../../mongoDB/getUsers/getUsers'
import { createUser } from '../../mongoDB/createUser/createUser'

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
  callbacks: {
    async signIn ({ user, account, profile }) {
      const existingUser = await getUsers(null, user.email)

      if (existingUser && existingUser.length > 0) {
        return true
      } else {
        // Get first and last name
        const nameParts = user.name.split(' ')
        const firstName = nameParts[0]
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''

        // Create User
        const createdUser = await createUser(user.email, firstName, lastName)
        return !!createdUser // Return true if creation is successful
      }
    },

    async jwt ({ token, user, account, profile, isNewUser }) {
      // This callback is called whenever a JWT is created. So session.userId is the mongo User _id
      if (user) {
        const mongoUsers = await getUsers(null, user.email)
        token.sub = mongoUsers[0]._id
      }
      return token
    },

    async session ({ session, user, token }) {
      // Assign the user ID to the session to make it available on the client side
      session.userId = token.sub // 'sub' is typically the field where the user ID from the provider is stored
      return session
    }
  }

  /*
    You can add custom sign in pages here if
    we don't want to use the default. refer to NextAuth
    documentation here:
    https://next-auth.js.org/configuration/options#pages
    */
}
