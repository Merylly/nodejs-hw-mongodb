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
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/uploadMulter.js';

const contactRouter = Router();

contactRouter.use(authenticate);

contactRouter.get('/', ctrlWrapper(getContactsController));

contactRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactRouter.post(
  '/',
  upload.single('avatar'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactRouter.put(
  '/:contactId',
  upload.single('avatar'),
  ctrlWrapper(upsertContactController),
);

contactRouter.patch(
  '/:contactId',
  upload.single('avatar'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

contactRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactRouter;
