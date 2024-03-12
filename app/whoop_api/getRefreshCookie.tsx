import { cookies } from "next/headers";
import { getFreshToken } from "./getNewToken";

export async function getRefreshCookie() {

    return getRefreshCookie(cookies().get("hrvpeak_refresh").value);


}