import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";
import * as React from "react";
import { LoggedInMenu } from "@/app/components/LoggedInMenu";
import { LoggedOutMenu } from "@/app/components/LoggedOutMenu";


import GetSession from "@/app/getsessioninfo/page";

export default async function Home() {

  const session = await getServerSession(authOptions);
  let menu;


  if (!session) {
    menu = <LoggedOutMenu />
  }
  else {
    menu = <LoggedInMenu />

  }

  return (
    <div className="justify-items-center">{menu}</div>
    
    
    )




  
}
