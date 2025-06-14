import { z } from 'zod';

const createContactValidationSchema = z.object({
  body: z.object({
    userName: z.string({ required_error: 'User name is required' }),
    email: z.string({ required_error: 'User email is required!' }),
    message: z.string({ required_error: 'Message is required!' }),
  }),
});

const updateContactValidationSchema = z.object({
  body: z.object({
    userName: z.string({ required_error: 'User name is required' }).optional(),
    email: z.string({ required_error: 'User email is required!' }).optional(),
    message: z.string({ required_error: 'Message is required!' }).optional(),
  }),
});

export const ContactValidations = {
  createContactValidationSchema,
  updateContactValidationSchema,
};
