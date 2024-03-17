'use client'

import { signOut } from "next-auth/react"


export default async function SignOut() {


    const s = await signOut('callbackUrl: '#');

    return (

        <h1> Signed out </h1>

    )


}