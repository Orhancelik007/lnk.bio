import clientPromise from "@/libs/mongoClient.ts";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";

export const authOptions = {
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
          })
    ],
    callbacks: {
        async signIn({account, profile}) {
            console.log("burası auth account: ");
            return true;
        }
    }
};

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }