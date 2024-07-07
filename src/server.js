import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';


import rootRouter from './routers/index.js';

import { env } from './utils/env.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';


const PORT = env('PORT');

export const startServer = () => {
  const app = express();

  app.use(cors());
   app.use(cookieParser());

  app.use(express.json());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.use(rootRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, 3000, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};
