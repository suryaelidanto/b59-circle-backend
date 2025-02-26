import express from 'express';
import threadController from '../controllers/thread.controller';
import { initCloudinary } from '../middlewares/cloudinary.middleware';
import { uploadImage } from '../middlewares/upload.middleware';
import { authCheck } from '../middlewares/auth-check.middleware';
import { rateLimit } from '../middlewares/rate-limit.middleware';

const router = express.Router();

router.use(rateLimit('thread'));

router.get('/', authCheck, threadController.getThreads);
router.get('/:id', authCheck, threadController.getThreadById);
router.post(
  '/',
  authCheck,
  initCloudinary,
  uploadImage.single('images'),
  threadController.createThread,
);

export default router;
