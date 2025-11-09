import Joi from 'joi';

export const createTodoSchema = Joi.object({
  title: Joi.string().min(1).max(200).required(),
  description: Joi.string().allow('', null).max(2000),
});

export const updateTodoSchema = Joi.object({
  title: Joi.string().min(1).max(200),
  description: Joi.string().allow('', null).max(2000),
  done: Joi.boolean(),
});
