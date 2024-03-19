'use client'

import { Button } from "@/components/ui/button"



export default function GetProfile() {
  return (
    <>
      <main className="flex h-full flex-col items-center justify-center bg-blue-500">
        <Button asChild size="lg" onClick={alert} >
          <h1>Get User Profile</h1>
        </Button>
      </main >
    </>
  )
}
