import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import mongoose from 'mongoose';

import { env } from './env.js';
import { getContacts, getContactsById } from './services/contacts.js';

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

  app.get('/contacts', async (req, res) => {
    const contacts = await getContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;

    if (!mongoose.isValidObjectId(contactId)) {
      return res.json({
        status: 400,
        message: 'Invalid contact Id',
      });
    }
    
    const contact = await getContactsById(contactId);

    if (!contact)
      return res.json({
        status: 404,
        message: 'Contact not found',
        data: null,
      });

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  app.use('*', (req, res) => {
    res.status(404).send('Oops! Route was not found!');
  });

  app.listen(PORT, 3000, () => {
    console.log(`Server is running on port ${PORT}!`);
  });
};
