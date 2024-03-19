"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Label } from "@radix-ui/react-label";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";

export default function SigninForm() {
  const [email, setEmail] = useState<null | string>(null);

  async function SigninWithEmail() {
    const signinResult = await signIn("email", {
      email: email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });

    if (!signinResult?.ok) {
      return toast({
        title: "This did not work...",
        description: "Something went wrong",
        variant: "destructive",
      });
    }

    return toast({
      title: "Please check your e-mail",
      description: "A magic link has been sent to you",
    });
  }

  return (
    <form action={SigninWithEmail}>
      <div className="flex flex-col gap-y-2">
        <Label>E-Mail</Label>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Please insert your email..."
        ></Input>
      </div>
      <Button type="submit" className="mt-4 w-full ">
        Login with E-Mail
      </Button>
    </form>
  );
}
