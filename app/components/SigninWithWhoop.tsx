"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SigninWithWhoop({ account }) {
  console.log("Whoop Button clicked");
  return (
    <>
      <Button
        variant="default"
        className="min-w-72"
        onClick={() =>
          signIn("whoop", {
            callbackUrl: "/",
          })
        }
      >
        {" "}
        {account}
      </Button>
    </>
  );
}
