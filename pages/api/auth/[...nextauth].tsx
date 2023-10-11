import NextAuth, { NextAuthOptions, Session, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import Prisma from "@/lib/db"
import { z } from "zod"

const UserCreds = z.object({
  email: z.string(),
  password: z.string()
});

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'email',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          console.log("Inside Credentials Provider...");
          const creds = UserCreds.parse(credentials)
          const user = await Prisma.user.findFirst({
                          where: { email: creds.email }
                        })
          if (user) return { id: user.id.toString(), name: user.name, email: user.email }
          else {
            const newUser = await Prisma.user.create({
              data: { email: creds.email }
            })
            return { id: newUser.id.toString(), name: newUser.name, email: newUser.email }
          }
        } catch (e) {
          console.log(e);
          return null
        }
      }
    })
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async signIn({ user }: { user: User }) {
      console.log("Inside sign in callback....");
      console.log("User", user);
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async session({ session, user }: {session: Session, user: User }) {
      console.log("Inside Session Callback......");
      console.log("Session: ",session);
      console.log("User: ",user);
      
      return session
    }
  }
  
}

export default NextAuth(authOptions)