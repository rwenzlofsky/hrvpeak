import { cookies } from "next/headers";

let n = 0;


async function setCookie() {
    'use server'

    console.log('Token Refresh was triggered', `${n}`);

    n++;

}

export default function TokenRefresh() {


    return (
        <p>Token Refresh</p>

    );
}

