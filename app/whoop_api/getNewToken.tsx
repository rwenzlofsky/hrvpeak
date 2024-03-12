import { cookies } from "next/headers";



let refreshParams = {
    grant_type: 'refresh_token',
    client_id: "764f99e3-068b-4836-9a44-71771614ad86",
    client_secret: "0fe6f168bce006587a4bf671a397ba8e05dc06ce9008ac8d899c870b2756e502",
    scope: 'offline',
    refresh_token: "nnnnnnn"
}

export async function getFreshToken(old_refresh_token) {
    refreshParams.refresh_token = String(old_refresh_token);
    const body = new URLSearchParams(refreshParams)
    const headers = {
        "Authorization": `Bearer ${refreshParams.refresh_token}`

    }

    const refreshTokenResponse = await fetch(
        `https://api.prod.whoop.com/oauth/oauth2/token`,
        {
            body,
            headers,
            method: 'POST',
        },
    )
    const data = await refreshTokenResponse.json();

    console.log("New Tokens", data);
    cookies().set("hrvpeak_refresh", `${data.refresh_token}`);
    cookies().set("hrvpeak_access", `${data.access_token}`);


    return
}