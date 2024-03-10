import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"






export default function Home() {
  return (
    <>
      <main className="flex h-full flex-col items-center justify-center bg-blue-500">
        <Button asChild size="lg">
          <Link href="/api/auth/signin">Connect with WHOOP</Link>
        </Button>
      </main >
    </>
  );
}
