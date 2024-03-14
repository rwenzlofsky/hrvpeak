
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { getFreshTokens } from "./whoop_api/refreshTokens";
import { cookies } from "next/headers";
import { getCycleCollection } from "./whoop_api/getCycleCollection";
import { getSession } from "next-auth/react"
import { getToken } from 'next-auth/jwt';



export default function Home() {



  const handleRefreshToken = async (data: FormData) => {
    'use server'
    //const itemId = data.get("itemId");

    const token = await getToken({ req })
    console.log("JSON Web Token", token)
    res.end()
    // API call to delete an item
  };


  const handleCycleCollection = async (data: FormData) => {
    "use server";
    //const itemId = data.get("itemId");
    await getCycleCollection(cookies().get("hrvpeak_access").value);
  };


  return (
    <>
      <main className="flex h-full flex-col items-center justify-center bg-blue-500">
        <Button asChild size="lg">
          <Link href="/api/auth/signin">Connect with WHOOP</Link>
        </Button>

        <form action={handleCycleCollection}>
          <input name="cycleId" className="hidden" defaultValue="" />
          <button type="submit">Cycles</button>
        </form>

        <form action={handleRefreshToken} >

          <input name="itemId" className="hidden" defaultValue="" />
          <button type="submit">Refresh</button>
        </form>



      </main >
    </>
  );
}
