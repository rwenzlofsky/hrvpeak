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
                <h1>Please log in</h1>

            )}
        </div>
        </>
    )

};