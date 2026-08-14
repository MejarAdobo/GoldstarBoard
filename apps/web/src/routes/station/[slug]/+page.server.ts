import { env } from "$env/dynamic/private";
import { getSecondsUntilNextUpdate } from "$lib/utils/cache";
import { error } from "@sveltejs/kit";

import type {
  HourlyData,
  Station,
  Stats,
} from "@goldstarboard/shared-types/interfaces";
import type { PageServerLoad } from "./$types";

export const prerender = false;

export const load: PageServerLoad = async ({ setHeaders, fetch, params }) => {
  const { API_URL } = env;
  const { slug } = params;

  const maxAge = getSecondsUntilNextUpdate();
  setHeaders({
    "cache-control": `public, max-age=${maxAge}, s-maxage=${maxAge}`,
  });

  const stationRes = await fetch(`${API_URL}/station`);
  const stations: Station[] = (await stationRes.json()) as Station[];
  const station = stations.find((s) => s.wuId === slug);

  // Doc: Return 404 if the station does not exist
  if (!station) {
    error(404);
  }

  const statsRes = await fetch(`${API_URL}/stat/station/${station.id}`);
  const hourlyRes = await fetch(`${API_URL}/hourly-data/station/${station.id}`);

  const stats: Stats = (await statsRes.json()) as Stats;
  const hourly: HourlyData = (await hourlyRes.json()) as HourlyData;

  return {
    station,
    stats,
    hourly,
  };
};
