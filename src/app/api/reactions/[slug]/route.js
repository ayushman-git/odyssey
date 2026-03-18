import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

const VALID_REACTIONS = ["like", "fire", "clap", "thinking"];

export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("article_reactions")
      .select("reaction, count")
      .eq("slug", slug);

    if (error) throw error;

    // Return all reaction types, defaulting missing ones to 0
    const reactions = Object.fromEntries(VALID_REACTIONS.map((r) => [r, 0]));
    for (const row of data ?? []) {
      reactions[row.reaction] = row.count;
    }

    return NextResponse.json({ reactions });
  } catch (error) {
    console.error("[reactions] GET error:", error);
    return NextResponse.json({ error: "Failed to fetch reactions" }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  // Skip tracking in dev / localhost
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.json({ skipped: true });
  }

  const { slug } = await params;

  let reaction;
  try {
    ({ reaction } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!VALID_REACTIONS.includes(reaction)) {
    return NextResponse.json(
      { error: `Invalid reaction. Must be one of: ${VALID_REACTIONS.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const supabase = getSupabaseAdminClient();
    await supabase.rpc("increment_reaction", { p_slug: slug, p_reaction: reaction });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[reactions] POST error:", error);
    return NextResponse.json({ error: "Failed to increment reaction" }, { status: 500 });
  }
}
