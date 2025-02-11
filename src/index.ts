import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import { testingMiddleware } from './middlewares/testing';
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT;

app.get('/', testingMiddleware('GET'), (req: Request, res: Response) => {
  res.send('Welcome to Circle API 😁!');
});

app.post('/', testingMiddleware('POST'), (req: Request, res: Response) => {
  const { fullName, email, address } = req.body;
  res.json({
    fullName,
    email,
    address,
  });
});

app.patch('/', testingMiddleware('PATCH'), (req: Request, res: Response) => {
  res.send('Welcome to PATCH!');
});

app.delete('/', testingMiddleware('DELETE'), (req: Request, res: Response) => {
  res.send('Welcome to DELETE!');
});

app.listen(port, () => {
  console.info(`Server is running at port ${port}`);
});
