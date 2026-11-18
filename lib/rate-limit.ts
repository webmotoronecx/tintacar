type Bucket = {
  count: number;
  resetAt: number;
};

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 5000;

function sweepExpired(now: number): void {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

/**
 * Fixed-window, in-memory limiter. Good enough for a single instance;
 * use a shared store (e.g. Redis/KV) when running multiple instances.
 */
export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  if (buckets.size > MAX_KEYS) sweepExpired(now);
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  buckets.set(key, { ...bucket, count: bucket.count + 1 });
  return bucket.count + 1 > limit;
}
