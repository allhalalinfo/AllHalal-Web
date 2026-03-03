import { NextResponse } from "next/server";
import { submitToIndexNow } from "@/lib/indexnow";

/**
 * Internal API Route for triggering IndexNow submissions.
 * POST /api/indexnow
 * 
 * Body format:
 * { "urls": ["https://allhalal.info/en/blog/my-post"] }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Type checking and validation
    if (!body || !body.urls || !Array.isArray(body.urls)) {
      return NextResponse.json(
        { error: "Invalid request body. Expected { urls: string[] }" },
        { status: 400 }
      );
    }
    
    const { urls } = body as { urls: string[] };
    
    // Safety check: Don't submit empty arrays
    if (urls.length === 0) {
      return NextResponse.json(
        { error: "URL array cannot be empty." },
        { status: 400 }
      );
    }

    // Call the utility function
    const success = await submitToIndexNow(urls);
    
    if (success) {
      return NextResponse.json({ 
        success: true, 
        message: `Successfully submitted ${urls.length} URL(s) to IndexNow.` 
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to submit URLs. Check server logs for details." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("[IndexNow API] Failed to parse request:", error);
    return NextResponse.json(
      { error: "Invalid JSON or bad request." },
      { status: 400 }
    );
  }
}
