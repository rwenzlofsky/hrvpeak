import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from '@/app/utils/db'


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
                    scope: "offline read:profile read:workout read:recovery read:cycles read:workout read:body_measurement",
                },
            },


            clientId: process.env.WHOOP_CLIENT_ID as string,
            clientSecret: process.env.WHOOP_CLIENT_SECRET as string,
            userinfo: process.env.WHOOP_USERINFO_URL as string,
            profile(profile) {
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
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        }),

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

            //cookies().set("hrvpeak_refresh", `${account.refresh_token}`);
            //cookies().set("hrvpeak_access", `${account.access_token}`);
            //}

            return token

        }
    },

};
