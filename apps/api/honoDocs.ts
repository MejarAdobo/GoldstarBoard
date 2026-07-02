import { defineConfig } from "@rcmade/hono-docs";

export default defineConfig({
  tsConfigPath: "./tsconfig.json",
  openApi: {
    openapi: "3.0.0",
    info: {
      title: "GoldstarBoard API",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3000", description: "Development" }],
  },
  outputs: {
    openApiJson: "./openapi/openapi.json",
  },
  apis: [
    {
      name: "REST API",
      apiPrefix: "/api",
      appTypePath: "src/index.ts", // Path to the file exporting your AppType
    },
  ],
});
