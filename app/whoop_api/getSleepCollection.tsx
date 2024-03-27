import { PrismaClient, Prisma } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../utils/auth";

const prisma = new PrismaClient();
const session = await getServerSession(authOptions);

let hrvpeak_user_id = session?.userid;

export async function getSleepCollection() {
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

  await deleteSleeps();

  console.log("Hier its stopss");

  do {
    if (n === 0) {
      url = encodeURI(
        "https://api.prod.whoop.com/developer/v1/activity/sleep" + get_dates
      );
    } else {
      url = encodeURI(
        "https://api.prod.whoop.com/developer/v1/activity/sleep" +
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
        createSleep(data.records[key]);
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

async function deleteSleeps() {
  await prisma.whoopSleep.deleteMany({});
}

async function createSleep(mydata) {
  await prisma.whoopSleep.create({
    data: {
      sleep_id: mydata.id,
      user_id: mydata.user_id,
      created_at: mydata.created_at,
      updated_at: mydata.updated_at,
      start: mydata.start,
      end: mydata.end,
      timezone_offset: mydata.timezone_offset,
      nap: mydata.nap,
      score_state: mydata.score_state,
      total_in_bed_time_milli:
        mydata.score.stage_summary.total_in_bed_time_milli,
      awake_time_milli: mydata.score.stage_summary.total_awake_time_milli,
      no_data_time_milli: mydata.score.stage_summary.total_no_data_time_milli,
      total_light_sleep_time_milli:
        mydata.score.stage_summary.total_light_sleep_time_milli,
      total_slow_wave_sleep_time_milli:
        mydata.score.stage_summary.total_slow_wave_sleep_time_milli,
      total_rem_sleep_time_milli:
        mydata.score.stage_summary.total_rem_sleep_time_milli,
      sleep_cycle_count: mydata.score.stage_summary.sleep_cycle_count,
      sleep_disturbance_count: mydata.score.stage_summary.disturbance_count,
      sleep_needed_baseline_milli: mydata.score.sleep_needed.baseline_milli,
      sleep_needed_need_from_sleep_debt_milli:
        mydata.score.sleep_needed.need_from_sleep_debt_milli,
      sleep_needed_need_from_recent_strain_milli:
        mydata.score.sleep_needed.need_from_recent_strain_milli,
      sleep_needed_need_from_recent_nap_milli:
        mydata.score.sleep_needed.need_from_recent_nap_milli,
      sleep_respiratory_rate: mydata.score.respiratory_rate,
      sleep_performance_percentage: mydata.score.sleep_performance_percentage,
      sleep_consistency_percentage: mydata.score.sleep_consistency_percentage,
      sleep_efficiency_percentage: mydata.score.sleep_efficiency_percentage,
      hrvpeak_user_id: hrvpeak_user_id,
    },
  });
}
