import { Contact } from '../db/models/contacts.js';

export const getContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactsById = async (contactId) => {
//   if (!contactId) return;

  const contact = Contact.find(contactId);
  return contact;
};
