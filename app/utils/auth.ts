import type { NextAuthOptions, Session, Account, User, Profile } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import OAuthProvider from "next-auth/providers/oauth"

import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/app/utils/db";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  //adapter: PrismaAdapter(prisma),
  providers: [
    {
      id: "whoop",
      name: "whoop",
      type: "oauth",
      version: "2.0",
      client: {
        token_endpoint_auth_method: "client_secret_post",
      },

      token: process.env.WHOOP_TOKEN_URL,
      authorization: {
        url: process.env.WHOOP_AUTH_URL,
        params: {
          scope:
            "offline read:profile read:workout read:recovery read:cycles read:workout read:body_measurement",
        },
      },

      clientId: process.env.WHOOP_CLIENT_ID as string,
      clientSecret: process.env.WHOOP_CLIENT_SECRET as string,
      userinfo: process.env.WHOOP_USERINFO_URL as string,
      profile(profile: any) {
        return {
          id: profile.user_id,
          first_name: profile.first_name,
          last_name: profile.last_name,
          email: profile.email,
        };
      },
    },
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: {user: User, account: Account, profile: Profile }) {
      console.log("Callback signIn, Profile", profile);
      console.log("Callback signIn, User", user);
      console.log("Callback signIn, Account", account);


      return true;
    },
    async redirect({ url, baseUrl }: {url: string, baseUrl: string}) {
      console.log("Callback Redirect", url);
      console.log("Callback Redirect", baseUrl);

      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;

    },
    async session({
      session,
      user,
    }: {
      session: Session;
      user: User;
    }): Promise<Session> {
      console.log("Callback Session , Profile", session);
      console.log("Callback Session , User", user);
      session.user.userid = user.id;
      
      return session;
    },
  },
};
