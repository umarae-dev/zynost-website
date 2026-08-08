import { NextRequest, NextResponse } from "next/server";

// Same-origin proxy to the real backend's /api/subscribe — the footer
// form calls THIS route (same domain, so the browser never needs a CORS
// preflight or cross-origin request at all), and this route forwards the
// request to Railway server-side. Added after users reported a 405 trying
// to subscribe directly cross-origin from the browser — some networks/ad
// blockers reject that pattern outright even when the backend itself
// answers fine (confirmed working via direct curl/script tests), so this
// removes that entire failure class rather than trying to chase it.
const BACKEND_URL = "https://goroai-backend-production.up.railway.app/api/subscribe";

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ detail: "Invalid request body." }, { status: 400 });
  }

  try {
    const backendResponse = await fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await backendResponse.json().catch(() => ({}));
    return NextResponse.json(data, { status: backendResponse.status });
  } catch {
    return NextResponse.json(
      { detail: "Couldn't reach the server — please try again." },
      { status: 502 },
    );
  }
}
