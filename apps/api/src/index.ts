import { OpenAPIHono } from "@hono/zod-openapi";
import award from "@routes/award";
import dailyData from "@routes/dailyData";
import historicalStat from "@routes/historicalStat";
import hourlyData from "@routes/hourlyData";
import stat from "@routes/stat";
import station from "@routes/station";
import { Scalar } from "@scalar/hono-api-reference";

const app = new OpenAPIHono().basePath("/api");

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    title: "GoldstarBoard API",
    version: "1.0.0",
  },
});

// eslint-disable-next-line new-cap
app.get("/", Scalar({ url: "/api/doc", theme: "kepler", layout: "classic" }));

const routes = [stat, station, hourlyData, historicalStat, dailyData, award] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = (typeof routes)[number];
export default app;
