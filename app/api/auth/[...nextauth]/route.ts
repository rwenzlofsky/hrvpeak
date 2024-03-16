//import { getFreshTokens } from "@/app/whoop_api/refreshTokens";
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import { authOptions } from "@/app/utils/auth"

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
