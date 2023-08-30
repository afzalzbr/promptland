import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDatabase } from "@utils/database";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {},
  async signIn({ profile }) {
    try {
      await connectToDatabase();

      // check if a user is already registered with this email in the database

      // if not, create a new

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  //   database: process.env.DATABASE_URL,
});
