import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import {
  createUserSchema,
  updateUserSchema,
} from '../utils/schemas/user.schema';

class UserController {
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const search = req.query.search as string;
      const users = await userService.getUsers(search);
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const validatedBody = await createUserSchema.validateAsync(body);
      const user = await userService.createUser(validatedBody);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const body = req.body;

      let user = await userService.getUserById(id);

      if (!user) {
        res.status(404).json({
          message: 'User not found!',
        });
        return;
      }

      const { email, username } = await updateUserSchema.validateAsync(body);

      if (email != '') {
        user.email = email;
      }

      if (username != '') {
        user.username = username;
      }

      const updatedUser = await userService.updateUserById(id, user);
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const user = await userService.deleteUserById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
