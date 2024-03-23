"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SigninWithWhoop() {
  "use client";
  console.log("Whoop Button clicked");
  return (
    <Button
      variant="default"
      className="min-w-48"
      onClick={() =>
        signIn("whoop", {
          callbackUrl: "/myaccount",
        })
      }
    >
      Connect with Whoop
    </Button>
  );
}
