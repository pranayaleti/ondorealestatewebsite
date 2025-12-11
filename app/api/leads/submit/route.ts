// app/api/leads/submit/route.ts
import { NextResponse } from "next/server";

// API routes don't work in static exports - configure as dynamic error to prevent build issues
export const dynamic = "error";
export const revalidate = false;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // #region agent log
    void fetch('http://127.0.0.1:7242/ingest/49ffbf2a-f4c5-4424-a401-0cb95371d96d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'postfix3',hypothesisId:'H1',location:'app/api/leads/submit/route.ts:POST:entry',message:'lead submit start',data:{fieldCount:Object.keys(body||{}).length,fieldNames:Array.isArray(body)?[]:Object.keys(body||{})},timestamp:Date.now()})}).catch(async()=>{try{const fs=await import('fs/promises');await fs.appendFile('/Users/pranay/Documents/ondorealestatewebsite/.cursor/debug.log',JSON.stringify({sessionId:'debug-session',runId:'postfix3',hypothesisId:'H1',location:'app/api/leads/submit/route.ts:POST:entry',message:'lead submit start (fs fallback)',data:{fieldCount:Object.keys(body||{}).length,fieldNames:Array.isArray(body)?[]:Object.keys(body||{})},timestamp:Date.now()})+"\\n");}catch{/* ignore */}});
    // #endregion

    const nowIso = new Date().toISOString();
    const fallbackPublicId = '5b3aba39-51f2-48b5-b3a0-db948cfde010'; // valid property publicId from public feed
    const leadData = {
      ...body,
      publicId: body.publicId ?? fallbackPublicId,
      tenantName: body.name ?? '',
      tenantEmail: body.email ?? '',
      tenantPhone: body.phone ?? '',
      moveInDate: body.moveInDate ?? nowIso,
      monthlyBudget: typeof body.monthlyBudget === 'number' && body.monthlyBudget > 0 ? body.monthlyBudget : 1,
      occupants: typeof body.occupants === 'number' ? body.occupants : 1,
      hasPets: typeof body.hasPets === 'boolean' ? body.hasPets : false,
    };

    const upstream = "https://ondorealestateserver.onrender.com/api/leads/submit";
    const res = await fetch(upstream, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(leadData),
      cache: "no-store",
    });

    // #region agent log
    void fetch('http://127.0.0.1:7242/ingest/49ffbf2a-f4c5-4424-a401-0cb95371d96d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'postfix3',hypothesisId:'H2',location:'app/api/leads/submit/route.ts:POST:upstream',message:'lead upstream response',data:{status:res.status,ok:res.ok},timestamp:Date.now()})}).catch(async()=>{try{const fs=await import('fs/promises');await fs.appendFile('/Users/pranay/Documents/ondorealestatewebsite/.cursor/debug.log',JSON.stringify({sessionId:'debug-session',runId:'postfix3',hypothesisId:'H2',location:'app/api/leads/submit/route.ts:POST:upstream',message:'lead upstream response (fs fallback)',data:{status:res.status,ok:res.ok},timestamp:Date.now()})+"\\n");}catch{/* ignore */}});
    // #endregion

    if (!res.ok) {
      const errorText = await res.clone().text().catch(() => '');
      const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
      return NextResponse.json(
        { error: errorData.error || "Lead submission failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Lead submission failed" },
      { status: 500 }
    );
  }
}
