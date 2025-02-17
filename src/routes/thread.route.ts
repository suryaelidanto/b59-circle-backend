import express from 'express';
import threadController from '../controllers/thread.controller';
import { initCloudinary } from '../middlewares/cloudinary.middleware';
import { uploadImage } from '../middlewares/upload.middleware';
import { authCheck } from '../middlewares/auth-check.middleware';

const router = express.Router();

router.get('/', threadController.getThreads);
router.get('/:id', threadController.getThreadById);
router.post(
  '/',
  authCheck,
  initCloudinary,
  uploadImage.single('images'),
  threadController.createThread,
);

export default router;
