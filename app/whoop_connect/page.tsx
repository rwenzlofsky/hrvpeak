import { getServerSession } from "next-auth"
import { authOptions } from "../utils/auth";


export default async function GetSession() {


    let session = await getServerSession(authOptions);
    let email = session?.user?.email;
    console.log("SESSSION = ", session);

    if (!session) {
        return <p>No session...</p>
    }

    if (session) {
        return <p>Session is: {email}</p>
    }


}