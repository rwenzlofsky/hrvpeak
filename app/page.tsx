
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { getFreshToken } from "./whoop_api/getNewToken";
import { cookies } from "next/headers";
import { getCycleCollection } from "./whoop_api/getCycleCollection";



export default function Home() {


  const handleDelete = async (data: FormData) => {
    "use server";
    //const itemId = data.get("itemId");

    await getFreshToken(cookies().get("hrvpeak_refresh").value);

    // API call to delete an item
  };


  const handleCycleCollection = async (data: FormData) => {
    "use server";
    //const itemId = data.get("itemId");
    await getCycleCollection(cookies().get("hrvpeak_access").value);


    // API call to delete an item
  };



  return (
    <>
      <main className="flex h-full flex-col items-center justify-center bg-blue-500">
        <Button asChild size="lg">
          <Link href="/api/auth/signin">Connect with WHOOP</Link>
        </Button>

        <form action={handleCycleCollection}>
          <input name="cycleId" className="hidden" value="1" />
          <button type="submit">Cycles</button>
        </form>

        <form action={handleDelete}>
          <input name="itemId" className="hidden" value="1" />
          <button type="submit">Refresh</button>
        </form>



      </main >
    </>
  );
}
