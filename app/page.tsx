import { getServerSession } from "next-auth"
import { authOptions } from "./utils/auth"
import LogoutButton from "./components/LogoutButton";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button";
import Link from "next/link";




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