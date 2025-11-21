/**
 * CSRF Protection Utilities
 * 
 * These utilities provide CSRF protection for when backend endpoints are added.
 * Currently a placeholder as the site is static.
 */

import { headers } from 'next/headers';

/**
 * Verify request origin matches expected domain
 * Use in Server Actions or API Routes
 */
export async function verifyOrigin(allowedOrigins: string[] = ['https://allhalal.info']): Promise<boolean> {
  const headersList = await headers();
  const origin = headersList.get('origin');
  const referer = headersList.get('referer');
  
  if (!origin && !referer) {
    // No origin header (may be same-origin request)
    return true;
  }
  
  const requestOrigin = origin || (referer ? new URL(referer).origin : '');
  
  return allowedOrigins.some(allowed => requestOrigin.startsWith(allowed));
}

/**
 * Generate CSRF token (placeholder for future implementation)
 * In production, use a proper CSRF library like 'csrf' or '@edge-csrf/nextjs'
 */
export function generateCSRFToken(): string {
  // In production, implement proper token generation
  // Example: use crypto.randomBytes(32).toString('hex')
  return 'placeholder-csrf-token';
}

/**
 * Validate CSRF token (placeholder for future implementation)
 */
export function validateCSRFToken(token: string): boolean {
  // In production, implement proper token validation
  // Compare against session-stored token
  return token === 'placeholder-csrf-token';
}

/**
 * Rate limiting helper (placeholder)
 * In production, use Upstash Rate Limit or similar
 */
export class RateLimiter {
  private attempts: Map<string, { count: number; resetAt: number }> = new Map();
  
  constructor(
    private maxAttempts: number = 5,
    private windowMs: number = 60000 // 1 minute
  ) {}
  
  async checkLimit(identifier: string): Promise<{ success: boolean; remaining: number }> {
    const now = Date.now();
    const record = this.attempts.get(identifier);
    
    if (!record || now > record.resetAt) {
      this.attempts.set(identifier, {
        count: 1,
        resetAt: now + this.windowMs
      });
      return { success: true, remaining: this.maxAttempts - 1 };
    }
    
    if (record.count >= this.maxAttempts) {
      return { success: false, remaining: 0 };
    }
    
    record.count++;
    return { success: true, remaining: this.maxAttempts - record.count };
  }
  
  clearIdentifier(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

/**
 * Example Server Action with CSRF protection
 * 
 * @example
 * 'use server'
 * 
 * export async function handleContactForm(formData: FormData) {
 *   // Verify origin
 *   const isValidOrigin = await verifyOrigin();
 *   if (!isValidOrigin) {
 *     return { error: 'Invalid request origin' };
 *   }
 *   
 *   // Rate limiting
 *   const ip = (await headers()).get('x-forwarded-for') || 'unknown';
 *   const limiter = new RateLimiter(5, 3600000); // 5 per hour
 *   const { success } = await limiter.checkLimit(ip);
 *   
 *   if (!success) {
 *     return { error: 'Too many requests. Try again later.' };
 *   }
 *   
 *   // Process form...
 *   return { success: true };
 * }
 */

