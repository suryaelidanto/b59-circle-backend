import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function authCheck(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'] || '';
  const jwtSecret = process.env.JWT_SECRET || '';
  const user = jwt.verify(token, jwtSecret);

  if (!user) {
    res.status(401).json({
      message: 'Unauthorized!',
    });
    return;
  }

  (req as any).user = user;
  next();
}
