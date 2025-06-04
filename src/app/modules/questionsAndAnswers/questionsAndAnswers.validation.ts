import { z } from 'zod';

const createQuestionValidationSchema = z.object({
  body: z.object({
    question: z.string({ required_error: 'Question is required!' }),
    sellerId: z.string({ required_error: 'SellerId is required!' }),
    productId: z.string({ required_error: 'ProductId is required!' }),
  }),
});

const answerValidationSchema = z.object({
  body: z.object({
    answer: z.string({ required_error: 'Answer is required!' }),
  }),
});

export const QuestionAndAnswerValidations = {
  createQuestionValidationSchema,
  answerValidationSchema,
};
