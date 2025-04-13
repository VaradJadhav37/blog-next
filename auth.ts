import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import Author from "./app/models/Author";
import { connectToDatabase } from './lib/mongodb';  // Correct import for named export
 // Import dbConnect

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
  
      if (!user?.email) {
        console.error("❌ No user email found");
        return false;
      }
  
      await connectToDatabase();
      console.log("✅ DB connected in signIn callback");
      console.log("🟡 User email:", user.email);
      const normalizedEmail = user.email.toLowerCase();
      console.log("🟡 Normalized email:", normalizedEmail);
      const existingUser = await Author.findOne({ email: normalizedEmail });
  
      if (!existingUser) {
        try {
          const newUser = new Author({
            name: user.name,
            image: user.image,
            bio: "hello",
            email: normalizedEmail,
          });
          await newUser.save();
          console.log("🟢 New user created:", newUser.toObject()); // log actual fields
          
        } catch (error) {
          console.error("❌ Error creating user:", error);
          return false;
        }
      } else {
        console.log("🟢 Existing user found:", existingUser);
      }
  
      return true;
    },
    async session({ session, token }) {
      // Do NOT overwrite the email — just add a userId field instead
      if (session?.user && token?.sub) {
        (session.user as any).userId = token.sub;
      }
      return session;
    },
  },
  
  secret: process.env.NEXTAUTH_SECRET!,
};
