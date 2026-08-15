import { env } from "$env/dynamic/private";
import { getSecondsUntilNextUpdate } from "$lib/utils/cache";

import type { PageServerLoad } from "./$types";
import type { HourlyData, RankingData } from "@goldstarboard/shared-types/interfaces";

export const prerender = false;

export const load: PageServerLoad = async ({ setHeaders, fetch }) => {
  const { API_URL } = env;

  const maxAge = getSecondsUntilNextUpdate();
  setHeaders({
    "cache-control": `public, max-age=${maxAge}, s-maxage=${maxAge}`,
  });

  let streakData: RankingData[] = [];
  let starData: RankingData[] = [];
  let hourlyData: HourlyData[] = [];

  await Promise.try(async () => {
    const [streakRes, starRes, hourlyRes] = await Promise.all([
      fetch(`${API_URL}/streak-ranking`),
      fetch(`${API_URL}/star-ranking`),
      fetch(`${API_URL}/hourly-data`),
    ]);

    streakData = (await streakRes.json()) as RankingData[];
    starData = (await starRes.json()) as RankingData[];
    hourlyData = (await hourlyRes.json()) as HourlyData[];
  }).catch((error) => {
    console.error("Failed to fetch rankings:", error);
  });

  return {
    streakData,
    starData,
    hourlyData,
  };
};
