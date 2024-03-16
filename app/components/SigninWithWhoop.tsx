'use client'

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SigninWithWhoop() {

    return (
        <Button onClick={() => signIn('whoop', {
            callbackUrl: "https://hrvpeak.com"
        }
        )} className="mt-4" variant="secondary">Connect with Whoop</Button>
    )


}