import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { Key, Mail, Router } from "lucide-react";
import SigninWithGoogle from "@/app/components/SigninWithGoogle"
import SigninWithWhoop from "@/app/components/SigninWithWhoop"
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import { redirect } from 'next/navigation'
import SigninForm from "../components/SigninForm";

export default async function AuthRoute() {
    const session = await getServerSession(authOptions);

    if (session) {

        return redirect('/')
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <Card>
                <CardHeader>
                    <CardTitle>Please sign in</CardTitle>
                    <CardDescription>You need to be authenticated to access this website</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col">
                        <SigninForm />
                        <SigninWithGoogle />
                    </div>
                </CardContent>
            </Card>
        </div>
    )


}