/**
 * Build same-origin image proxy URL without `?url=https://...`, which many privacy
 * blocklists match. Token is base64url(UTF-8 remote URL).
 */
export function encodeProxiedImageToken(remoteUrl: string): string {
  const bytes = new TextEncoder().encode(remoteUrl);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]!);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function proxiedImageSrc(remoteUrl: string): string {
  return `/api/img/${encodeProxiedImageToken(remoteUrl)}`;
}
