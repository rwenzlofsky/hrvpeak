import { cookies } from "next/headers";
import { getRefreshCookie } from "@/app/whoop_api/getRefreshCookie"

let n = 0;


async function setCookie() {
    'use server'

    console.log('Token Refresh was triggered', n);

    n++;

}

export default function TokenRefresh() {

    setCookie();

    return (
        <p>Token Refresh</p>

    );
}

