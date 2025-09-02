import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("playlists", "routes/playlists.tsx"),
  route("bpm-processing", "routes/bpm-processing.tsx"),
  route("workout-builder", "routes/workout-builder.tsx"),
  route("spotify-callback", "routes/spotify-callback.tsx"),
  route("spotify-api", "routes/spotify-api.tsx"),
] satisfies RouteConfig;
