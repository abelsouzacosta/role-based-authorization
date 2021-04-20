import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import ApplicationError from '@shared/errors/ApplicationError';
import { errors } from 'celebrate';
import 'dotenv/config';
import '@shared/typeorm';
import router from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.use(errors());

// middleware de erros da aplicação
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(400).json({
    status: 'error',
    errorName: err.name,
    message: err.message,
    stack: err.stack,
  });
});

app.listen(process.env.PORT);
