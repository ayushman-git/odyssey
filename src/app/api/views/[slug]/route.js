import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function GET(request, { params }) {
  const { slug } = await params;

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("article_views")
      .select("count")
      .eq("slug", slug)
      .single();

    if (error && error.code !== "PGRST116") throw error; // PGRST116 = no rows

    return NextResponse.json({ views: data?.count ?? 0 });
  } catch (error) {
    console.error("[views] GET error:", error);
    return NextResponse.json({ error: "Failed to fetch views" }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  // Skip tracking in dev / localhost
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.json({ skipped: true });
  }

  const { slug } = await params;

  try {
    const supabase = getSupabaseAdminClient();
    await supabase.rpc("increment_view", { p_slug: slug });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[views] POST error:", error);
    return NextResponse.json({ error: "Failed to increment view" }, { status: 500 });
  }
}
