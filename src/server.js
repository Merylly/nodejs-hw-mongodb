import express from 'express';
import pino from 'pino-http';
import cors from 'cors';


import contactRouter from './routers/contacts.js';

import { env } from './env.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = env('PORT');

export const startServer = () => {
  const app = express();

  app.use(cors());

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

  app.use(contactRouter);

  app.use('*', notFoundHandler);
  
  app.use(errorHandler);

  app.listen(PORT, 3000, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};
