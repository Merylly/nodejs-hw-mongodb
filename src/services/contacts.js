import createHttpError from 'http-errors';
import { Contact } from '../db/models/contacts.js';
import { createPaginationInformation } from '../utils/createPagInfo.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const [contactsCount, contacts] = await Promise.all([
    Contact.countDocuments(),
    Contact.find()
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationInfo = createPaginationInformation(
    page,
    perPage,
    contactsCount,
  );

  return {
    data: contacts,
    ...paginationInfo,
  };
};

export const getContactsById = async (contactId) => {
  const contact = Contact.findById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Student not found');
  }

  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await Contact.findByIdAndUpdate(contactId, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findByIdAndDelete(contactId);
  return contact;
};
