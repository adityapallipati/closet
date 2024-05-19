/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Ratelimit } from "@upstash/ratelimit"; 
import { Redis } from "@upstash/redis"; 

// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "100 s"),
  analytics: true,
  /**
   * Optional prefix for the keys used in redis. This is useful if you want to share a redis
   * instance with other applications and want to avoid key collisions. The default prefix is
   * "@upstash/ratelimit"
   */
  prefix: "@upstash/ratelimit",
});