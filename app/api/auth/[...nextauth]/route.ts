import NextAuth, { AuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { profile } from "console";
import { PrismaClient } from '@prisma/client';
import { storeToken } from '@/app/whoop_api/storeToken'

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
          scope: "read:profile read:workout read:recovery read:cycles read:workout read:body_measurement",
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
    async jwt({ token, account , profile}) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      console.log('JWT entered', token.accessToken)

      await fetch('https://api.prod.whoop.com/developer/v1/recovery',{

       method: 'GET',
        headers:{
          "Authorization":`Bearer ${token.accessToken}`
        }
        }
        )
        .then(response => response.json())
        .then(data => {
          // 'data' is the JavaScript object obtained from the response
           let myVariable = data;
          // Now you can use 'myVariable' as needed

          console.log('AccessToken',account?.access_token);
          console.log('ExpiresAt',account?.expires_at);
          console.log('ID Token',account?.id_token);
          console.log('Provider',account?.provider);
          console.log('Provider AccountID',account?.providerAccountId);
          console.log('RefreshToken',account?.refresh_token);
          console.log('Scope',account?.scope);
          console.log('SessionState',account?.session_state);
          console.log('TokenType',account?.token_type);
          console.log('UserInfo',account?.userinfo);
          console.log('TokenName',token.name);
          console.log('ProfileName',profile?.name)

          storeToken(profile?.email,account?.access_token);
          console.log('Next Token = ', myVariable.next_token);
          console.log('First cyclId = ', myVariable.records[1].score);
          
      })
      
      return token
      
    }
  },

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
