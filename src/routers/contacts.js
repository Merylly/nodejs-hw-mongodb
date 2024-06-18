import { Router } from 'express';
import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../middlewares/ctrlWrapper.js';

const contactRouter = Router();

contactRouter.get('/contacts', ctrlWrapper(getContactsController));

contactRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);

contactRouter.post('/contacts', ctrlWrapper(createContactController));

contactRouter.put('/contacts/:contactId', ctrlWrapper(upsertContactController));

contactRouter.patch(
  '/contacts/:contactId',
  ctrlWrapper(patchContactController),
);

contactRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactController),
);

export default contactRouter;
