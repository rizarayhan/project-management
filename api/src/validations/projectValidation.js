import Joi from "joi";

export const createProjectValidation = Joi.object({
  projectId: Joi.string().allow(null).optional(),
  title: Joi.string().required(),
  description: Joi.string().min(10).required(),
  dueDate: Joi.date().greater("now").required(),
  tags: Joi.array().items(Joi.string()).required(),
  priority: Joi.string().valid("low", "medium", "high").required(),
});

export const updateProjectValidation = Joi.object({
  projectId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().min(10).required(),
  dueDate: Joi.date().greater("now").required(),
  tags: Joi.array().items(Joi.string()).required(),
  priority: Joi.string().valid("low", "medium", "high").required(),
});
