import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  base: process.env.NODE_ENV === "production" ? "/pelojams/" : "/",
  server: {
    host: true, // This allows binding to all interfaces (127.0.0.1, localhost, etc.)
    port: 5173,
  },
  build: {
    outDir: "dist",
  },
});
