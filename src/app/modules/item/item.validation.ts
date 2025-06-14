import { z } from 'zod';

const createItemValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Item title is required!' }),
    description: z.string({ required_error: 'Item description is required!' }),
    price: z.number({ required_error: 'Item price is required!' }),
    condition: z.string({ required_error: 'Item condition is required!' }),
    images: z.array(z.string()).nonempty('At least one image is required!'),
    category: z.string({ required_error: 'CategoryId is required!' }),
    quantity: z.number({ required_error: 'Quantity is required!' }),
    location: z.string({ required_error: 'Item location is required!' }),
  }),
});

const updateItemValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    condition: z
      .string({ required_error: 'Item condition is required!' })
      .optional(),
    images: z.array(z.string()).optional(),
    category: z.string().optional(),
    quantity: z.number({ required_error: 'Quantity is required!' }).optional(),
    location: z.string().optional(),
  }),
});

const addOrRemoveOfferPriceValidationSchema = z.object({
  body: z.object({
    offerPrice: z.number({ required_error: 'Offer price is required!' }),
  }),
});

export const ItemValidations = {
  createItemValidationSchema,
  updateItemValidationSchema,
  addOrRemoveOfferPriceValidationSchema,
};
