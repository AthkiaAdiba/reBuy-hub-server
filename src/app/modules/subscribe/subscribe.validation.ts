import { z } from 'zod';

const createSubscribeValidationSchema = z.object({
  body: z.object({
    userEmail: z.string({ required_error: 'User email is required!' }),
  }),
});

export const SubscribeValidations = {
  createSubscribeValidationSchema,
};
