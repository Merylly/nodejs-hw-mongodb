import mongoose from 'mongoose';
import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getContacts,
  getContactsById,
  updateContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const contacts = await getContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  if (!mongoose.isValidObjectId(contactId)) {
    next(createHttpError(400, 'Invalid contact ID.'));
    return;
  }

  const contact = await getContactsById(contactId);

  if (!contact) {
    next(
      createHttpError({
        status: 404,
        message: 'Contact not found',
        data: null,
      }),
    );
    return;
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: contact,
  });
};

export const upsertContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await updateContact(contactId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(
      createHttpError({
        status: 404,
        message: 'Contact not found',
        data: null,
      }),
    );
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a contact!`,
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await deleteContact(id);

  if (!contact) {
    next(
      createHttpError({
        status: 404,
        message: 'Contact not found',
        data: null,
      }),
    );
    return;
  }

  res.status(204).send();
};
