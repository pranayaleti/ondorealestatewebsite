// app/api/properties/public/route.ts
import { NextResponse } from "next/server";

// Configure for static export
export const dynamic = "force-static";
export const revalidate = 0;

export async function GET() {
  const upstream = "https://ondorealestateserver.onrender.com/api/properties/public";
  const res = await fetch(upstream, { cache: "no-store" });
  const data = await res.json();
  return NextResponse.json(data, { status: res.ok ? 200 : 500 });
}
