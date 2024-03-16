'use client'

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { Router } from "next/router"

export default function LogoutButton() {

    return (

        <Button onClick={() => signOut({ callbackUrl: '/auth' })
        }>Logout</Button>


    )


}