import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Name is required',
    'string.min': 'Min string length is not achieved. {{#limit}} required',
    'string.max': 'Max string length is not achieved',
  }),
  phoneNumber: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Phone number is required',
    'string.min': 'Min string length is not achieved. {{#limit}} required',
    'string.max': 'Max string length is not achieved',
  }),
  email: Joi.string().email().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().min(3).max(20),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email().min(3).max(20),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().min(3).max(20),
});
