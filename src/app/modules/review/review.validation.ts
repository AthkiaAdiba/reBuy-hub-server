import { z } from 'zod';

const createReviewValidationSchema = z.object({
  body: z.object({
    userName: z.string({ required_error: 'User Name is required!' }),
    userEmail: z.string({ required_error: 'User Email is required!' }),
    userImage: z
      .string({ required_error: 'User Email is required!' })
      .optional(),
    rating: z.number({ required_error: 'Rating is required!' }),
    review: z.string({ required_error: 'Review is required!' }),
  }),
});

const updateReviewValidationSchema = z.object({
  body: z.object({
    rating: z.number({ required_error: 'Rating is required!' }).optional(),
    review: z.string({ required_error: 'Review is required!' }).optional(),
  }),
});

export const ReviewValidations = {
  createReviewValidationSchema,
  updateReviewValidationSchema,
};
