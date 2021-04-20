import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import 'dotenv/config';
import '@shared/typeorm';
import router from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(process.env.PORT);
