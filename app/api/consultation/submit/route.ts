// app/api/consultation/submit/route.ts
import { NextResponse } from "next/server";

// Configure for static export
export const dynamic = "force-static";
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Add consultation-specific fields to the lead data
    const consultationData = {
      ...body,
      leadType: 'consultation',
      timestamp: new Date().toISOString(),
      utm_source: body.source || 'consultation_form',
      utm_medium: 'website',
      utm_campaign: 'consultation_booking'
    };

    const upstream = "https://ondorealestateserver.onrender.com/api/leads/submit";
    const res = await fetch(upstream, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(consultationData),
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (e: any) {
    console.error('Consultation submission error:', e);
    return NextResponse.json(
      { error: e?.message ?? "Consultation submission failed" },
      { status: 500 }
    );
  }
}
