import { cookies } from "next/headers";
import { PrismaClient } from '@prisma/client'
import { getToken } from 'next-auth/jwt';


const prisma = new PrismaClient();


let refreshParams = {
    grant_type: 'refresh_token',
    client_id: String(process.env.WHOOP_CLIENT_ID),
    client_secret: String(process.env.WHOOP_CLIENT_SECRET),
    scope: 'offline',
    refresh_token: ''
}

export async function getFreshTokens(old_refresh_token: string, user_id: number) {
    refreshParams.refresh_token = old_refresh_token;
    const body = new URLSearchParams(refreshParams)
    const headers = {
        "Authorization": `Bearer ${refreshParams.refresh_token}`
    }

    const refreshTokenResponse = await fetch(
        String(process.env.WHOOP_TOKEN_URL),
        {
            body,
            headers,
            method: 'POST',
        },
    )
    const data = await refreshTokenResponse.json();



    cookies().set("hrvpeak_refresh", `${data.refresh_token}`);
    cookies().set("hrvpeak_access", `${data.access_token}`);


    const res = await prisma.token.upsert({
        where: { user_id: user_id },
        update: {
            user_id: user_id,
            created_at: new Date(),
            access_token: data.access_token,
            refresh_token: data.refresh_token
        },
        create: {
            user_id: user_id,
            created_at: new Date(),
            access_token: data.access_token,
            refresh_token: data.refresh_token
        }
    }
    )
    return

}



