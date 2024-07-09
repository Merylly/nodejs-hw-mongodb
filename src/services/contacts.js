import createHttpError from 'http-errors';
import { Contact } from '../db/models/contacts.js';
import { createPaginationInformation } from '../utils/createPagInfo.js';

export const getContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = Contact.find({ userId });

  const [contactsCount, contacts] = await Promise.all([
    Contact.countDocuments({ userId }),
    contactsQuery
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

export const getContactsById = async ({ contactId, userId }) => {
  const contact = Contact.findOne({ _id: contactId, userId: userId });

  if (!contact) {
    throw createHttpError(404, 'Student not found');
  }

  return contact;
};

export const createContact = async (payload, userId, photo) => {
  const contact = await Contact.create({ ...payload, userId: userId, photo });
  return contact;
};

export const updateContact = async (
  contactId,
  userId,
  { photo, ...payload },
  options = {},
) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId, userId: userId },
    { ...payload, photo },
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async ({ contactId, userId }) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    userId: userId,
  });
  return contact;
};
