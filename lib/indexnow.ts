/**
 * Utility for submitting URLs to IndexNow (Bing, Yandex, etc.)
 * Server-side only.
 */

const INDEXNOW_KEY = "4526bc4b52e74039bf5adc89763d577c";
const HOST = "allhalal.info";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

/**
 * Submits an array of URLs to IndexNow.
 * Does not throw errors to prevent app crashes, but logs failures.
 * 
 * @param urls Array of absolute URLs to submit (e.g., ["https://allhalal.info/en/blog/post-slug"])
 * @returns Boolean indicating whether the submission was apparently successful
 */
export async function submitToIndexNow(urls: string[]): Promise<boolean> {
  if (!urls || urls.length === 0) {
    console.warn("[IndexNow] No URLs provided for submission.");
    return false;
  }

  // Ensure URLs are absolute and belong to our host
  const validUrls = urls.filter(url => {
    try {
      const parsedUrl = new URL(url);
      return parsedUrl.hostname === HOST || parsedUrl.hostname === `www.${HOST}`;
    } catch {
      console.warn(`[IndexNow] Invalid URL skipped: ${url}`);
      return false;
    }
  });

  if (validUrls.length === 0) {
    console.warn("[IndexNow] No valid URLs to submit after filtering.");
    return false;
  }

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: validUrls
  };

  try {
    console.log(`[IndexNow] Submitting ${validUrls.length} URL(s)...`);
    
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
      // Keep timeout reasonable so we don't hang server processes
      signal: AbortSignal.timeout(10000) 
    });

    if (response.ok) {
      console.log(`[IndexNow] Successfully submitted ${validUrls.length} URL(s). Response status: ${response.status}`);
      return true;
    } else {
      let errorBody = "";
      try {
        errorBody = await response.text();
      } catch (e) {
        // Ignore parsing errors
      }
      
      console.error(`[IndexNow] Submission failed with status: ${response.status}. ${errorBody}`);
      return false;
    }
  } catch (error) {
    console.error("[IndexNow] Network or unexpected error during submission:", error);
    // Explicitly return false instead of throwing to prevent crashing the caller
    return false;
  }
}
