import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../utils/auth";
import Link from "next/link";
import RefreshWhoopData from "@/app/components/RefreshWhoopData";
import { isEmpty } from "@/lib/utils";
import SigninWithWhoop from "@/app/components/SigninWithWhoop";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "../utils/db";

export default async function MyAccount() {
  const session = await getServerSession(authOptions);

  let userid = session?.userid;

  const result: [] =
    await prisma.$queryRaw`SELECT "providerAccountId" FROM hrvpeak.public."Account" WHERE provider = 'whoop'`;
  console.log("SQL = ", result);

  let whoop_account: string = isEmpty(result)
    ? "Connect Whoop"
    : "Reconnect Whoop " + result[0].providerAccountId;

  return (
    <main>
      <h1 className="ml-10 mt-5 mb-3 font-bold">My account</h1>
      <h2 className="ml-10">
        <p>You are logged in as {session?.user}</p>
      </h2>

      <Card className="min-w-fit ml-10 mr-10 mt-7 mb-10">
        <CardHeader>
          <CardTitle>Account Details</CardTitle>
          <CardDescription>Change your account details here.</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-lg font-medium leading-none">
                Reconnect my WHOOP account
              </p>
              <p className="text-sm text-muted-foreground">
                Reconnecting your account if you lost the connection.
              </p>
              <div>
                <SigninWithWhoop account={whoop_account} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-lg font-medium leading-none">
                Refresh all my WHOOP data
              </p>
              <p className="text-sm text-muted-foreground">
                Refresh all data available in your whoop account.
              </p>
              <div className="container justify-left">
                <Button variant="destructive" className="min-w-72">
                  <Link href="/getwhoopdata" legacyBehavior passHref>
                    Refresh WHoop Data
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardContent className="grid gap-4">
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <div className="flex-1 space-y-1">
              <p className="text-lg font-medium leading-none">
                Delete my account
              </p>
              <p className="text-sm text-muted-foreground">
                This will delete your account from our service.
              </p>
              <div>
                <Button variant="destructive" className="min-w-72">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
