"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SigninWithGoogle() {
  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/myaccount",
        })
      }
      className="mt-4"
      variant="secondary"
    >
      Login with Google
    </Button>
  );
}
