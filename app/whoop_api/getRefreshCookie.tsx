import { cookies } from "next/headers";
import { getFreshToken } from "./refreshTokens";

export async function getRefreshCookie() {

    return getRefreshCookie(cookies().get("hrvpeak_refresh").value);


}