import { searchArticles } from "@/utils/search";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const searchString = searchParams.get("str");
  const result = searchArticles(searchString);

  const response = result.map(({ item }) => item);
  return NextResponse.json(response);
}
