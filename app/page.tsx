import { getServerSession } from "next-auth"
import { authOptions } from "./utils/auth"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as React from "react"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import LogoutButton from "./components/LogoutButton";



export default async function Home() {
    const session = await getServerSession(authOptions);
    return (

        <>


            <div>


                {session ? (
                    <div>
                        <h1>You are logged in</h1>

                        <LogoutButton />
                    </div>
                ) : (
                    <div>
                        <h1>Please log in</h1>
                        <Button asChild>
                            <Link href="/auth">Login</Link>
                        </Button>
                    </div>
                )}



            </div >


        </>
    )

};