import { Contact } from '../db/models/contacts.js';

export const getContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContactsById = async (contactId) => {

  const contact = Contact.findById(contactId);
  return contact;
};
