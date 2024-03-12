import NextAuth, { AuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { profile } from "console";
import { PrismaClient } from '@prisma/client';
import { getProfileBasic } from '@/app/whoop_api/getProfileBasic'
import { getCycleCollection } from "@/app/whoop_api/getCycleCollection";
import { cookies } from "next/headers";
import { getFreshToken } from "@/app/whoop_api/getNewToken";


let myVariable = {}

/*async function store(mytoken) {
  console.log('In STORE')
  const a = await prisma.AccessToken.create({
    data: {
      token: mytoken
    }
  })
};*/

export const authOptions: AuthOptions = {
  debug: true,
  providers: [
    {
      id: "whoop",
      name: "whoop",
      type: "oauth",
      version: "2.0",
      client: {
        token_endpoint_auth_method: "client_secret_post",
      },


      token: "https://api.prod.whoop.com/oauth/oauth2/token",
      authorization: {
        url: "https://api.prod.whoop.com/oauth/oauth2/auth",
        params: {
          scope: "offline read:profile read:workout read:recovery read:cycles read:workout read:body_measurement",
        },
      },


      clientId: "764f99e3-068b-4836-9a44-71771614ad86",
      clientSecret: "0fe6f168bce006587a4bf671a397ba8e05dc06ce9008ac8d899c870b2756e502",
      userinfo: "https://api.prod.whoop.com/developer/v1/user/profile/basic",
      profile(profile) {
        return {
          id: profile.user_id,
          first_name: profile.first_name,
          last_name: profile.last_name,
          email: profile.email,

        };
      },
    }
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;

      }
      console.log('JWT entered', token.accessToken);

      if (account) {

        cookies().set("hrvpeak_refresh", `${account.refresh_token}`);
        cookies().set("hrvpeak_access", `${account.access_token}`);

        //getCycleCollection(account);
      }
      return token

    }
  },

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
