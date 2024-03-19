import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Key, Mail, Router } from "lucide-react";
import SigninWithWhoop from "@/app/components/SigninWithWhoop";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import { redirect } from "next/navigation";

export default async function AuthWhoop() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth");
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="flex mb-4">
            Connect your Whoop Account
          </CardTitle>
          <div className="flex justify-center items-center mb-14">
            <img src="whoop.png" className="w-16 mb-6" />
          </div>
          <CardDescription className="flex 4">
            Your whoop data is never shared with any third party
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-0">
          <div className="flex flex-col">
            <SigninWithWhoop />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
