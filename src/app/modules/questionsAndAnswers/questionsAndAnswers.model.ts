import { model, Schema } from 'mongoose';
import { TQuestionsAndAnswers } from './questionsAndAnswers.interface';

const questionAndAnswerSchema = new Schema<TQuestionsAndAnswers>(
  {
    question: {
      type: String,
      required: [true, 'Question is required!'],
    },
    answer: {
      type: String,
      default: '',
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Item',
    },
    publishedStatus: {
      type: String,
      enum: ['Published', 'Unpublished'],
      default: 'Unpublished',
    },
  },
  {
    timestamps: true,
  },
);

export const QuestionAndAnswerModel = model<TQuestionsAndAnswers>(
  'QuestionAndAnswer',
  questionAndAnswerSchema,
);
