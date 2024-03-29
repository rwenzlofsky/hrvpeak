import { PrismaClient, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../utils/auth";

const prisma = new PrismaClient();
const session = await getServerSession(authOptions);

let hrvpeak_user_id = session?.userid;

export async function getCycleCollection() {
  console.log("Session User Id", hrvpeak_user_id);

  const access_token = await prisma.account.findFirst({
    where: {
      userId: session?.userid,
      provider: "whoop",
    },
  });

  console.log("Whoop Access Token:", access_token?.access_token);

  let nexttoken: string | null = null;
  let get_dates =
    "?start=2024-01-01T00:00:00.000Z&end=2024-01-15T00:00:00.000Z";

  let n: number = 0;
  let url: string = "";

  await deleteCycles();

  do {
    if (n === 0) {
      url = encodeURI(
        "https://api.prod.whoop.com/developer/v1/cycle" + get_dates
      );
    } else {
      url = encodeURI(
        "https://api.prod.whoop.com/developer/v1/cycle" +
          get_dates +
          "&nextToken=" +
          nexttoken
      );
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `bearer ${access_token?.access_token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log(
        "Rate Limit = ",
        response.headers.get("X-RateLimit-Remaining")
      );
      console.log(
        "Rate Limit Reset = ",
        response.headers.get("X-RateLimit-Reset")
      );

      nexttoken = data.next_token;
      for (var key in data.records) {
        createCycle(data.records[key]);
      }
    } else {
      console.log("Error", response.status, response.statusText);
      return {
        error: { status: response.status, statusText: response.statusText },
      };
    }

    n = n + 1;
  } while (nexttoken !== null);
}

async function deleteCycles() {
  await prisma.whoopCycle.deleteMany({});
}

async function createCycle(mydata) {
  await prisma.whoopCycle.create({
    data: {
      cycle_id: mydata.id,
      user_id: mydata.user_id,
      created_at: mydata.created_at,
      updated_dt: mydata.updated_at,
      start: mydata.start,
      end: mydata.end,
      timezone_offset: mydata.timezone_offset,
      score_state: mydata.score_state,
      strain: mydata.score.strain,
      kilojoule: mydata.score.kilojoule,
      average_heart_rate: mydata.score.average_heart_rate,
      max_heart_rate: mydata.score.max_heart_rate,
      hrvpeak_user_id: hrvpeak_user_id,
    },
  });
}
