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
                        <div className="flex flex-col gap-y-2">
                            <Label>E-Mail</Label>
                            <Input name="email" type="email" placeholder="Please insert your email..."></Input>

                        </div>
                        <Button className="mt-4">Login with E-Mail<Mail className="ml-4" /></Button>
                        <SigninWithGoogle />
                        <SigninWithWhoop />
                    </div>
                </CardContent>
            </Card>
        </div>
    )


}