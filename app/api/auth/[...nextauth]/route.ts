// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authOptions } from "@/auth"; // or "@/lib/auth" if it's in lib

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
