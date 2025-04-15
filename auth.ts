import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import Author from "./app/models/Author";
import { connectToDatabase } from './lib/mongodb';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log("🟡 signIn callback triggered with user:", user);

      if (!user?.email) return false;

      await connectToDatabase();
      const normalizedEmail = user.email.toLowerCase();
      let existingUser = await Author.findOne({ email: normalizedEmail });

      if (!existingUser) {
        try {
          existingUser = await Author.create({
            name: user.name,
            image: user.image,
            bio: "hello",
            email: normalizedEmail,
          });
          console.log("🟢 New user created:", existingUser.toObject());
        } catch (error) {
          console.error("❌ Error creating user:", error);
          return false;
        }
      } else {
        console.log("🟢 Existing user found:", existingUser);
      }

      return true;
    },

    async jwt({ token, account, user }) {
      await connectToDatabase();

      if (token.email) {
        const dbUser = await Author.findOne({ email: token.email.toLowerCase() });
        if (dbUser) {
          token.id = dbUser._id.toString(); // Set actual MongoDB ID
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string; // Now your session contains MongoDB _id
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET!,
};
