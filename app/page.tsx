import { Session, getServerSession } from "next-auth"
import { authOptions } from "./utils/auth"
import * as React from "react"
import { NavMenu } from "@/app/components/NavMenu"
import { LoggedInMenu } from "@/app/components/LoggedInMenu"




export default async function Home() {
    const session = await getServerSession(authOptions);

    let menu;

    if (!session) {
        menu = <NavMenu />
    } else {
        menu = <LoggedInMenu />

    }
    return (

        <>
            {menu}
        </>

    )

};