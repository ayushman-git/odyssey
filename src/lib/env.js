import { createRequire } from "module";

const require = createRequire(import.meta.url);
const {
  assertCoreServerEnv,
  ensureProductionServerEnv,
  parseCoreServerEnvOrThrow,
} = require("../../lib/env-core.cjs");

export { assertCoreServerEnv, ensureProductionServerEnv };

let cachedCore = null;

/**
 * Parsed server env for Supabase + Resend. Throws with actionable errors if anything is missing or invalid.
 * Do not import this module from client components.
 */
export function getCoreServerEnv() {
  if (cachedCore) return cachedCore;
  cachedCore = Object.freeze(parseCoreServerEnvOrThrow());
  return cachedCore;
}

/** Optional Spotify credentials for /api/spotify — omit any to disable that integration. */
export function getSpotifyEnv() {
  return {
    clientId: (process.env.SPOTIFY_CLIENT_ID || "").trim(),
    clientSecret: (process.env.SPOTIFY_CLIENT_SECRET || "").trim(),
    refreshToken: (process.env.SPOTIFY_REFRESH_TOKEN || "").trim(),
  };
}
