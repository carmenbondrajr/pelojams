import type { Config } from "@react-router/dev/config";

const config: Config = {
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
};

if (process.env.NODE_ENV === "production") {
  config.basename = "/pelojams";
}

export default config;
