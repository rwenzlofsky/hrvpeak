import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SigninWithGoogle from "@/app/components/SigninWithGoogle";
import { getServerSession } from "next-auth";
import { authOptions } from "../utils/auth";
import SigninForm from "../components/SigninForm";

export default async function AuthRoute() {
  const session = await getServerSession(authOptions);

  /*if (session) {
    return;
  }*/

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Please sign in</CardTitle>
          <CardDescription>
            You need to be authenticated to access this website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col">
            <SigninForm />
            <SigninWithGoogle />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
