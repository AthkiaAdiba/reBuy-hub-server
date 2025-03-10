import { z } from 'zod';

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required!' }).optional(),
    address: z.string({ required_error: 'Address is required!' }).optional(),
    phone: z.string({ required_error: 'Phone is required!' }).optional(),
    image: z.string({ required_error: 'Image is required!' }).optional(),
  }),
});

export const UserValidations = {
  updateUserValidationSchema,
};
