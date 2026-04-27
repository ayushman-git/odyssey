"use strict";

/**
 * Single source of truth for server-side env validation.
 * Documented variable list: see `.env.example` in the repo root.
 *
 * Import only from Node / Route Handlers / Server Components — never from client components.
 */

function validateSupabaseUrl(raw, errors) {
  let u;
  try {
    u = new URL(raw);
  } catch {
    errors.push("SUPABASE_URL must be a valid URL (e.g. https://xxxx.supabase.co).");
    return;
  }
  const local = u.hostname === "localhost" || u.hostname === "127.0.0.1";
  if (u.protocol === "https:") return;
  if (u.protocol === "http:" && local) return;
  errors.push(
    "SUPABASE_URL must use https in production, or http://localhost / http://127.0.0.1 for local Supabase."
  );
}

function collectCoreErrors() {
  const errors = [];
  const supabaseUrl = (process.env.SUPABASE_URL || "").trim();
  const serviceRole = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();
  const resendKey = (process.env.RESEND_KEY || "").trim();

  if (!supabaseUrl) {
    errors.push(
      "SUPABASE_URL is missing. Set it to your Supabase project URL (Project Settings → API)."
    );
  } else {
    validateSupabaseUrl(supabaseUrl, errors);
  }

  if (!serviceRole) {
    errors.push(
      "SUPABASE_SERVICE_ROLE_KEY is missing. Use the service_role key from Supabase (server only; never NEXT_PUBLIC_* or client code)."
    );
  } else if (serviceRole.length < 20) {
    errors.push("SUPABASE_SERVICE_ROLE_KEY looks too short — check you pasted the full service_role JWT.");
  }

  if (!resendKey) {
    errors.push(
      "RESEND_KEY is missing. Create an API key in the Resend dashboard and add it to your host env (Vercel/Netlify) or .env.local."
    );
  } else if (!resendKey.startsWith("re_")) {
    errors.push('RESEND_KEY should normally start with "re_". Verify you are using a Resend API key.');
  }

  return { errors, supabaseUrl, serviceRole, resendKey };
}

function formatCoreEnvError(errors) {
  return (
    "Missing or invalid server environment variables:\n\n" +
    errors.map((e) => `  • ${e}`).join("\n") +
    "\n\nFix: copy `.env.example` to `.env.local` for local dev, or set the same keys in Vercel / Netlify project environment settings."
  );
}

function parseCoreServerEnvOrThrow() {
  const o = collectCoreErrors();
  if (!o.errors.length) {
    return {
      supabaseUrl: o.supabaseUrl,
      supabaseServiceRoleKey: o.serviceRole,
      resendKey: o.resendKey,
    };
  }
  throw new Error(formatCoreEnvError(o.errors));
}

function assertCoreServerEnv() {
  parseCoreServerEnvOrThrow();
}

function ensureProductionServerEnv() {
  if (process.env.NODE_ENV !== "production") return;
  assertCoreServerEnv();
}

module.exports = {
  assertCoreServerEnv,
  ensureProductionServerEnv,
  collectCoreErrors,
  parseCoreServerEnvOrThrow,
};
