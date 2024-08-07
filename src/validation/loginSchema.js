import Joi from 'joi';

export const loginSchema = Joi.object({
  password: Joi.string().required().min(2).max(12),
  email: Joi.string().required().email(),
});
