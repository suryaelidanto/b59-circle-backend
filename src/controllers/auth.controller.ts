import { Request, Response } from 'express';
import authService from '../services/auth.service';
import userService from '../services/user.service';
import { loginSchema, registerSchema } from '../utils/schemas/auth.schema';
import bcrypt from 'bcrypt';
import { RegisterDTO } from '../dtos/auth.dto';

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const body = req.body;
      const { email, password } = await loginSchema.validateAsync(body);
      const user = await userService.getUserByEmail(email);

      if (!user) {
        res.status(404).json({
          message: 'Email/password is wrong!',
        });
        return;
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        res.status(404).json({
          message: 'Email/password is wrong!',
        });
        return;
      }

      res.json({
        message: 'Login success!',
      });
    } catch (error) {
      res.json(error);
    }
  }

  async register(req: Request, res: Response) {
    try {
      const body = req.body;
      const validatedBody = await registerSchema.validateAsync(body);
      const hashedPassword = await bcrypt.hash(validatedBody.password, 10);

      const registerBody: RegisterDTO = {
        ...validatedBody,
        password: hashedPassword,
      };

      const user = await authService.register(registerBody);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  }
}

export default new AuthController();
