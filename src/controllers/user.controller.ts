import { Request, Response } from 'express';
import userService from '../services/user.service';

class UserController {
  async getUsers(req: Request, res: Response) {
    const users = await userService.getUsers();
    res.json(users);
  }

  async createUser(req: Request, res: Response) {
    //TODO: add validator
    const { email, username, password } = req.body;

    const user = await userService.createUser({
      email,
      username,
      password,
    });

    res.json(user);
  }
}

export default new UserController();
