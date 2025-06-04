import { z } from 'zod';

const createCategoryValidationSchema = z.object({
  body: z.object({
    categoryName: z.string({ required_error: 'Category Name is required!' }),
    categoryImage: z.string({ required_error: 'Category image is required!' }),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z.object({
    categoryName: z
      .string({ required_error: 'Category Name is required!' })
      .optional(),
    categoryImage: z
      .string({ required_error: 'Category image is required!' })
      .optional(),
  }),
});

export const CategoryValidations = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
