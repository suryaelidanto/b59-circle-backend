import { NextFunction, Request, Response } from 'express';
import threadService from '../services/thread.service';
import likeService from '../services/like.service';

import { createThreadSchema } from '../utils/schemas/thread.schema';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import fs from 'fs';

class ThreadController {
  async getThreads(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const threads = await threadService.getThreads();
      const newThreads = await Promise.all(
        threads.map(async (thread) => {
          const like = await likeService.getLikeById(userId, thread.id);
          const isLiked = like ? true : false;
          const likesCount = thread.likes.length;

          return {
            ...thread,
            likesCount,
            isLiked,
          };
        }),
      );
      res.json(newThreads);
    } catch (error) {
      next(error);
    }
  }

  async getThreadById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const thread = await threadService.getThreadById(id);
      res.json(thread);
    } catch (error) {
      next(error);
    }
  }

  async createThread(req: Request, res: Response, next: NextFunction) {
    /*  #swagger.requestBody = {
              required: true,
              content: {
                  "multipart/form-data": {
                      schema: {
                          $ref: "#/components/schemas/CreateThreadDTO"
                      }  
                  }
              }
          } 
      */

    try {
      let uploadResult: UploadApiResponse = {} as UploadApiResponse;

      if (req.file) {
        uploadResult = await cloudinary.uploader.upload(req.file?.path || '');
        fs.unlinkSync(req.file.path);
      }

      const body = {
        ...req.body,
        images: uploadResult?.secure_url ?? undefined,
      };

      const userId = (req as any).user.id;
      const validatedBody = await createThreadSchema.validateAsync(body);
      const thread = await threadService.createThread(userId, validatedBody);
      res.json({
        message: 'Thread created!',
        data: { ...thread },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ThreadController();
