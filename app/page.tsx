import { getServerSession } from "next-auth"
import { authOptions } from "./utils/auth"
import * as React from "react"
import { NavMenu } from "@/app/components/NavMenu"
import { LoggedInMenu } from "@/app/components/LoggedInMenu"
import GetSession from "@/app/getsessioninfo/page"




export default async function Home() {
    const mysession = await getServerSession(authOptions);

    let menu;

    if (!mysession) {
        menu = <NavMenu />
    } else {
        console.log("Session choosing LoggedinMenu");
        menu = <LoggedInMenu> <GetSession /> </LoggedInMenu>

    }
    return (

        <>
            {menu}
        </>

    )

};