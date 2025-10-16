import Joi from "joi";

export const sendInvitationValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be string",
    "string.empty": "Email is required",
    "any.required": "Email is required",
    "string.email": "Invalid email format",
  }),

  projectId: Joi.string().required().messages({
    "string.base": "Project Id must be string",
    "string.empty": "Project Id is required",
    "any.required": "Project Id is required",
  }),
});
