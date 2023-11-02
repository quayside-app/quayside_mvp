import NextAuth from 'next-auth'
import { options } from './options'
/**NextAuth is a function that handles the providers
 * for OAuth, and the handler is used to move to an
 * external site for authentication, then back to our webpage
 * after authentication is confirmed.
 */
const handler = NextAuth(options)

export { handler as GET, handler as POST}