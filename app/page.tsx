import { getServerSession } from "next-auth"
import { authOptions } from "./utils/auth"


export default async function Home() {
    const session = await getServerSession(authOptions);
    return (

        <div className="p-10">

            <h1>This is a public route</h1>
            {session ? (
                <h1>You are logged in</h1>

            ) : (
                <h1>Please log in</h1>

            )}
        </div>
    )

};