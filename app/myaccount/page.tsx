import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../utils/auth";
import Link from "next/link";

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

  let userid = session?.user?.userid;
  const result =
    await prisma.$queryRaw`SELECT "providerAccountId" FROM hrvpeak.public."Account" WHERE provider = 'whoop'`;
  console.log("SQL = ", result);

  return (
    <main>
      <h1 className="ml-10 mt-5 mb-3 font-bold">My account</h1>
      <h2 className="ml-10">
        You are logged in as {session?.user?.userid} xx{" "}
        {result[0]?.providerAccountId}
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
                Reconnecting your account if you lost the connection. xx
              </p>
              <div>
                <Button variant="default" className="min-w-48">
                  <Link href="/whoop_auth" legacyBehavior passHref>
                    Whoop Signin
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
                Refresh all my WHOOP data
              </p>
              <p className="text-sm text-muted-foreground">
                Refresh all data available in your whoop account.
              </p>
              <div>
                <Button variant="default" className="min-w-48">
                  Refresh
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
                <Button variant="destructive" className="min-w-48">
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
