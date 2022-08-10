import { MongoClient } from "mongodb";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from '../../../lib/mongodb'

export default NextAuth({
    providers:[
        GithubProvider({
            clientId: 'e0a1300c6f29abff4e2e',
            clientSecret: 'e657581eba8e5905b61554f1dec5dce14175927b',
            // clientId: process.env.GITHUB_ID,
            // clientSecret: process.env.GITHUB_SECRET,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
              }
        })
    ],
    database:process.env.MONGODB_URI,
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt",
    },
    jwt:{
        secret:'helloshajibadminhere'
    },
    callbacks: {
        async jwt({ token, account, user }) {
            // Persist the OAuth access_token to the token right after signin
            if (user) {
            //   token.accessToken = account.access_token
              token.id=user.id
            }
            return token
        },
        async session({ session, token }) {
          session.user.id=token.id
          return session
        },
        // async session(session,token){
        //     session.user.id=token.id
        //     return session
        // }
    }
})