import type { ActionFunctionArgs } from "react-router";

/**
 * Server-side route to handle Spotify token exchange
 * This keeps the client secret secure on the server
 */
export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const formData = await request.formData();
    const code = formData.get("code") as string;

    if (!code) {
      return Response.json(
        { error: "No authorization code provided" },
        { status: 400 }
      );
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const redirectUri =
      process.env.SPOTIFY_REDIRECT_URI ||
      `${new URL(request.url).origin}/spotify-callback`;

    if (!clientId || !clientSecret) {
      console.error("Missing Spotify credentials in server environment");
      return Response.json(
        { error: "Spotify credentials not configured" },
        { status: 500 }
      );
    }

    // Exchange code for tokens on server-side
    const tokenResponse = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("Spotify token exchange failed:", errorData);
      return Response.json({ error: "Token exchange failed" }, { status: 400 });
    }

    const tokens = await tokenResponse.json();
    return Response.json(tokens);
  } catch (error) {
    console.error("Token exchange error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
