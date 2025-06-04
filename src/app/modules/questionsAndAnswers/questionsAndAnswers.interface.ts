import { Types } from 'mongoose';

export type TQuestionsAndAnswers = {
  question: string;
  answer?: string;
  userId?: string;
  sellerId: Types.ObjectId;
  productId: Types.ObjectId;
  publishedStatus: 'Published' | 'Unpublished';
};
