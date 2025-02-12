import { NextFunction, Request, Response } from 'express';

export function testingMiddleware(text: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    console.log(text);
    next();
  };
}
