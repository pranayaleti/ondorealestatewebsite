// app/api/consultation/submit/route.ts
import { NextResponse } from "next/server";
import { logError } from "@/lib/error-handler";

// API routes don't work in static exports - configure as dynamic error to prevent build issues
export const dynamic = "error";
export const revalidate = false;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // #region agent log
    void fetch('http://127.0.0.1:7242/ingest/49ffbf2a-f4c5-4424-a401-0cb95371d96d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'postfix3',hypothesisId:'H1',location:'app/api/consultation/submit/route.ts:POST:entry',message:'consultation submit start',data:{fieldCount:Object.keys(body||{}).length,fieldNames:Array.isArray(body)?[]:Object.keys(body||{}),hasSource:!!body?.source},timestamp:Date.now()})}).catch(async()=>{try{const fs=await import('fs/promises');await fs.appendFile('/Users/pranay/Documents/ondorealestatewebsite/.cursor/debug.log',JSON.stringify({sessionId:'debug-session',runId:'postfix3',hypothesisId:'H1',location:'app/api/consultation/submit/route.ts:POST:entry',message:'consultation submit start (fs fallback)',data:{fieldCount:Object.keys(body||{}).length,fieldNames:Array.isArray(body)?[]:Object.keys(body||{}),hasSource:!!body?.source},timestamp:Date.now()})+"\\n");}catch{/* ignore */}});
    // #endregion

    const nowIso = new Date().toISOString();
    const fallbackPublicId = '5b3aba39-51f2-48b5-b3a0-db948cfde010'; // valid property publicId from public feed
    // Add consultation-specific fields to the lead data plus defaults required by upstream validation
    const consultationData = {
      ...body,
      leadType: 'consultation',
      timestamp: nowIso,
      utm_source: body.source || 'consultation_form',
      utm_medium: 'website',
      utm_campaign: 'consultation_booking',
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
      body: JSON.stringify(consultationData),
      cache: "no-store",
    });

    // #region agent log
    void fetch('http://127.0.0.1:7242/ingest/49ffbf2a-f4c5-4424-a401-0cb95371d96d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'postfix3',hypothesisId:'H2',location:'app/api/consultation/submit/route.ts:POST:upstream',message:'consultation upstream response',data:{status:res.status,ok:res.ok},timestamp:Date.now()})}).catch(async()=>{try{const fs=await import('fs/promises');await fs.appendFile('/Users/pranay/Documents/ondorealestatewebsite/.cursor/debug.log',JSON.stringify({sessionId:'debug-session',runId:'postfix3',hypothesisId:'H2',location:'app/api/consultation/submit/route.ts:POST:upstream',message:'consultation upstream response (fs fallback)',data:{status:res.status,ok:res.ok},timestamp:Date.now()})+"\\n");}catch{/* ignore */}});
    // #endregion

    if (!res.ok) {
      const errorText = await res.clone().text().catch(() => '');
      const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
      return NextResponse.json(
        { error: errorData.error || "Consultation submission failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    // #region agent log
    void fetch('http://127.0.0.1:7242/ingest/49ffbf2a-f4c5-4424-a401-0cb95371d96d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'baseline',hypothesisId:'H3',location:'app/api/consultation/submit/route.ts:POST:catch',message:'consultation handler threw',data:{errorType:error instanceof Error ? error.name : typeof error},timestamp:Date.now()})}).catch(async()=>{try{const fs=await import('fs/promises');await fs.appendFile('/Users/pranay/Documents/ondorealestatewebsite/.cursor/debug.log',JSON.stringify({sessionId:'debug-session',runId:'baseline',hypothesisId:'H3',location:'app/api/consultation/submit/route.ts:POST:catch',message:'consultation handler threw (fs fallback)',data:{errorType:error instanceof Error ? error.name : typeof error},timestamp:Date.now()})+"\\n");}catch{/* ignore */}});
    // #endregion
    logError(error, 'consultation-submission');
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Consultation submission failed" },
      { status: 500 }
    );
  }
}
