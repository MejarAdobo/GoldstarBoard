import { env } from '$env/dynamic/private';
import { getSecondsUntilNextUpdate } from "$lib/utils/cache";

import type { HourlyData, RankingData } from "@goldstarboard/shared-types/interfaces";
import type { PageServerLoad } from "./$types";

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
    [streakData, starData, hourlyData] = await Promise.all([
      fetch(`${API_URL}/streak-ranking`).then((r) => r.json()),
      fetch(`${API_URL}/star-ranking`).then((r) => r.json()),
      fetch(`${API_URL}/hourly-data`).then((r) => r.json()),
    ]);
  }).catch((error) => {
    console.error("Failed to fetch rankings:", error);
  });

  return {
    streakData,
    starData,
    hourlyData,
  };
};
