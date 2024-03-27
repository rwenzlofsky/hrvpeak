import { PrismaClient, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../utils/auth";

const prisma = new PrismaClient();
const session = await getServerSession(authOptions);

let hrvpeak_user_id = session?.userid;

export async function getWorkoutCollection() {
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

  await deleteWorkouts();

  do {
    if (n === 0) {
      url = encodeURI(
        "https://api.prod.whoop.com/developer/v1/activity/workout" + get_dates
      );
    } else {
      url = encodeURI(
        "https://api.prod.whoop.com/developer/v1/activity/workout" +
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
        createWorkout(data.records[key]);
        console.log(data.records[key]);
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

async function deleteWorkouts() {
  await prisma.whoopWorkout.deleteMany({});
}

async function createWorkout(mydata) {
  await prisma.whoopWorkout.create({
    data: {
      workout_id: mydata.id,
      user_id: mydata.user_id,
      created_at: mydata.created_at,
      updated_at: mydata.updated_at,
      start: mydata.start,
      end: mydata.end,
      timezone_offset: mydata.timezone_offset,
      sport_id: mydata.sport_id,
      score_state: mydata.score_state,
      score_strain: mydata.score.strain,
      score_average_heart_rate: mydata.score.average_heart_rate,
      score_max_heart_rate: mydata.score.max_heart_rate,
      score_kilojoule: mydata.score.kilojoule,
      score_percent_recorded: mydata.score.percent_recorded,
      score_distance_meter: mydata.score.distance_meter,
      score_altitude_gain_meter: mydata.score.altitude_gain_meter,
      score__altitude_change_meter: mydata.score.altitude_change_meter,
      zone_zero_milli: mydata.score.zone_duration.zone_zero_milli,
      zone_one_milli: mydata.score.zone_duration.zone_one_milli,
      zone_two_milli: mydata.score.zone_duration.zone_two_milli,
      zone_three_milli: mydata.score.zone_duration.zone_three_milli,
      zone_four_mill: mydata.score.zone_duration.zone_four_milli,
      zone_five_milli: mydata.score.zone_duration.zone_five_milli,
      hrvpeak_user_id: hrvpeak_user_id,
    },
  });
}
