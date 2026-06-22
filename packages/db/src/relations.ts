import * as schema from "./schema";
/* Oxc-ignore-next-line sort-imports */
import { defineRelations } from "drizzle-orm";

export const relations = defineRelations(schema, (r) => ({
  historicalStats: {
    station: r.one.stations({
      from: r.historicalStats.stationId,
      to: r.stations.id
    })
  },
  dailyData: {
    station: r.one.stations({
      from: r.dailyData.stationId,
      to: r.stations.id,
    }),
  },
  awards: {
    station: r.one.stations({
      from: r.awards.stationId,
      to: r.stations.id,
    }),
  },
  stations: {
    stats: r.one.stats(),
    hourlyData: r.one.hourlyData(),
    historicalStats: r.many.historicalStats(),
    dailyData: r.many.dailyData(),
    awards: r.many.awards(),
  },
}));
