import { getServerSession } from "next-auth/next";
import { authOptions } from "../utils/auth";



export default async function GetSession() {

    const session = await getServerSession(authOptions);

    return (
        <>
            <h1>{session?.user?.email}</h1>

        </>

    )
}