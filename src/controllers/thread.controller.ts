import { NextFunction, Request, Response } from 'express';
import threadService from '../services/thread.service';
import { createThreadSchema } from '../utils/schemas/thread.schema';
import { v2 as cloudinary } from 'cloudinary';

class ThreadController {
  async getThreads(req: Request, res: Response, next: NextFunction) {
    try {
      const threads = await threadService.getThreads();
      res.json(threads);
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
      const uploadResult = await cloudinary.uploader.upload(
        req.file?.path || '',
      );
      const body = {
        ...req.body,
        images: uploadResult.secure_url,
      };

      const userId = (req as any).user.id;
      const validatedBody = await createThreadSchema.validateAsync(body);
      const thread = await threadService.createThread(userId, validatedBody);
      res.json(thread);
    } catch (error) {
      next(error);
    }
  }
}

export default new ThreadController();
