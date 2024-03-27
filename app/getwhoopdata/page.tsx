import { getCycleCollection } from "@/app/whoop_api/getCycleCollection";
import { getRecoveryCollection } from "@/app/whoop_api/getRecoveryCollection";
import { getSleepCollection } from "@/app/whoop_api/getSleepCollection";
import { getWorkoutCollection } from "@/app/whoop_api/getWorkoutCollection";

export default async function GetWhoopData() {
  await getCycleCollection();
  await getRecoveryCollection();
  await getSleepCollection();
  await getWorkoutCollection();

  return <h1>Getting Whoop Data</h1>;
}
