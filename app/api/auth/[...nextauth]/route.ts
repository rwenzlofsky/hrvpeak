import { getFreshTokens } from "@/app/whoop_api/refreshTokens";
import NextAuth, { AuthOptions } from "next-auth";
import { cookies } from "next/headers";



export const authOptions = {
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


            token: process.env.WHOOP_TOKEN_URL,
            authorization: {
                url: process.env.WHOOP_AUTH_URL,
                params: {
                    scope: "offline read:profile read:workout read:recovery read:cycles read:workout read:body_measurement",
                },
            },


            clientId: process.env.WHOOP_CLIENT_ID,
            clientSecret: process.env.WHOOP_CLIENT_SECRET,
            userinfo: process.env.WHOOP_USERINFO_URL,
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




        async jwt({ token, user, account, profile }) {
            //if (account !== undefined) {

            token.x_user = user.id;
            token.x = user.email;
            token.x_acccess = account?.access_token;
            token.x_refresh = account?.refresh_token;
            console.log("Token=", token);
            //getFreshTokens(account.refresh_token, profile.user_id);

            //token.accessToken = account.access_token;

            cookies().set("hrvpeak_refresh", `${account.refresh_token}`);
            cookies().set("hrvpeak_access", `${account.access_token}`);
            //}

            return token

        }
    },

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
