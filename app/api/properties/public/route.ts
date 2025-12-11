// app/api/properties/public/route.ts
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

async function appendDebug(line: Record<string, unknown>) {
  try {
    const logPath = "/Users/pranay/Documents/ondorealestatewebsite/.cursor/debug.log";
    await fs.mkdir(path.dirname(logPath), { recursive: true });
    await fs.appendFile(logPath, JSON.stringify(line) + "\n");
  } catch {
    // swallow to avoid breaking the route in debug mode
  }
}

// API routes don't work in static exports - this is a build-time route only
// For runtime API calls, use client-side fetch directly to upstream
export const dynamic = "error";
export const revalidate = false;

export async function GET() {
  try {
    // #region agent log
    void fetch('http://127.0.0.1:7242/ingest/49ffbf2a-f4c5-4424-a401-0cb95371d96d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'investigation1',hypothesisId:'H1',location:'app/api/properties/public/route.ts:GET:entry',message:'public properties fetch start',data:{},timestamp:Date.now()})}).catch(async()=>{await appendDebug({sessionId:'debug-session',runId:'investigation1',hypothesisId:'H1',location:'app/api/properties/public/route.ts:GET:entry',message:'public properties fetch start (fs fallback)',data:{},timestamp:Date.now()});});
    // #endregion

    const upstream = "https://ondorealestateserver.onrender.com/api/properties/public";
    const res = await fetch(upstream, { 
      cache: "no-store",
      next: { revalidate: 0 }
    });

    // #region agent log
    void fetch('http://127.0.0.1:7242/ingest/49ffbf2a-f4c5-4424-a401-0cb95371d96d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'investigation1',hypothesisId:'H2',location:'app/api/properties/public/route.ts:GET:response',message:'upstream properties response',data:{status:res.status,ok:res.ok,contentType:res.headers.get('content-type')},timestamp:Date.now()})}).catch(async()=>{await appendDebug({sessionId:'debug-session',runId:'investigation1',hypothesisId:'H2',location:'app/api/properties/public/route.ts:GET:response',message:'upstream properties response (fs fallback)',data:{status:res.status,ok:res.ok,contentType:res.headers.get('content-type')},timestamp:Date.now()});});
    // #endregion
    
    if (!res.ok) {
      // #region agent log
      void fetch('http://127.0.0.1:7242/ingest/49ffbf2a-f4c5-4424-a401-0cb95371d96d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'investigation1',hypothesisId:'H3',location:'app/api/properties/public/route.ts:GET:nonok',message:'non-ok upstream status',data:{status:res.status},timestamp:Date.now()})}).catch(async()=>{await appendDebug({sessionId:'debug-session',runId:'investigation1',hypothesisId:'H3',location:'app/api/properties/public/route.ts:GET:nonok',message:'non-ok upstream status (fs fallback)',data:{status:res.status},timestamp:Date.now()});});
      // #endregion
      return NextResponse.json(
        { error: "Failed to fetch properties" }, 
        { status: res.status }
      );
    }
    
    const data = await res.json();

    // #region agent log
    void fetch('http://127.0.0.1:7242/ingest/49ffbf2a-f4c5-4424-a401-0cb95371d96d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'investigation1',hypothesisId:'H4',location:'app/api/properties/public/route.ts:GET:payload',message:'properties payload received',data:{count:Array.isArray(data)?data.length:undefined,keys:!Array.isArray(data)&&data?Object.keys(data):[]},timestamp:Date.now()})}).catch(async()=>{await appendDebug({sessionId:'debug-session',runId:'investigation1',hypothesisId:'H4',location:'app/api/properties/public/route.ts:GET:payload',message:'properties payload received (fs fallback)',data:{count:Array.isArray(data)?data.length:undefined,keys:!Array.isArray(data)&&data?Object.keys(data):[]},timestamp:Date.now()});});
    // #endregion
    return NextResponse.json(data);
  } catch (error) {
    // #region agent log
    void fetch('http://127.0.0.1:7242/ingest/49ffbf2a-f4c5-4424-a401-0cb95371d96d',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({sessionId:'debug-session',runId:'investigation1',hypothesisId:'H5',location:'app/api/properties/public/route.ts:GET:catch',message:'public properties handler threw',data:{errorType:error instanceof Error ? error.name : typeof error},timestamp:Date.now()})}).catch(async()=>{await appendDebug({sessionId:'debug-session',runId:'investigation1',hypothesisId:'H5',location:'app/api/properties/public/route.ts:GET:catch',message:'public properties handler threw (fs fallback)',data:{errorType:error instanceof Error ? error.name : typeof error},timestamp:Date.now()});});
    // #endregion
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" }, 
      { status: 500 }
    );
  }
}
