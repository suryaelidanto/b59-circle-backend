import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { RedisStore } from 'rate-limit-redis';
import likeController from '../controllers/like.controller';
import { authCheck } from '../middlewares/auth-check.middleware';
import RedisClient from 'ioredis';

const router = express.Router();

const client = new RedisClient();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: {
    message: 'Too many requests, please try again later.',
  },
  // Redis store configuration
  store: new RedisStore({
    // @ts-expect-error - Known issue: the `call` function is not present in @types/ioredis
    sendCommand: (...args: string[]) => client.call(...args),
  }),
});

router.use(limiter);

router.post('/', authCheck, likeController.createLike);
router.delete('/:threadId', authCheck, likeController.deleteLike);

export default router;
