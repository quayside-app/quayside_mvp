'use client';

import { SessionProvider } from "next-auth/react"

// Let's us use the next-auth useSession hook in layout.txt 
// https://medium.com/ascentic-technology/authentication-with-next-js-13-and-next-auth-9c69d55d6bfd
export function Provider ({children, session}) {
  return (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>)
}