import express from 'express';
import threadController from '../controllers/thread.controller';
import { initCloudinary } from '../middlewares/cloudinary.middleware';
import { uploadImage } from '../middlewares/upload.middleware';
import { authCheck } from '../middlewares/auth-check.middleware';
import { rateLimit } from 'express-rate-limit';

const router = express.Router();

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  message: {
    message: 'Too many requests, please try again later.',
  },
  // store: ... , // Redis, Memcached, etc. See below.
});

router.get('/', authCheck, threadController.getThreads);
router.get('/:id', authCheck, threadController.getThreadById);
router.post(
  '/',
  limiter,
  authCheck,
  initCloudinary,
  uploadImage.single('images'),
  threadController.createThread,
);

export default router;
