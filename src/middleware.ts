//protects entire site instead of select pages
export { default } from "next-auth/middleware"

//Applies authentication to select pages
//docs: https://nextjs.org/docs/pages/building-your-application/routing/api-routes
//example below:
//export const config = { matcher: ["/main", etc...]