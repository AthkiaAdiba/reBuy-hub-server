/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../auth/auth.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { TQuestionsAndAnswers } from './questionsAndAnswers.interface';
import { QuestionAndAnswerModel } from './questionsAndAnswers.model';

const createQuestionIntoDB = async (payload: TQuestionsAndAnswers) => {
  const result = await QuestionAndAnswerModel.create(payload);

  return result;
};

const giveAnswerIntoDB = async (
  id: string,
  payload: Partial<TQuestionsAndAnswers>,
) => {
  const question = await QuestionAndAnswerModel.findById(id);

  if (!question) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This question is not exists!');
  }

  const result = await QuestionAndAnswerModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const getAllProductQuestionsAndAnswersFromDB = async (
  productId: string,
  query: any,
) => {
  const baseQuery = QuestionAndAnswerModel.find({
    publishedStatus: 'Published',
    productId: productId,
  });

  // Pass the Mongoose Query object to QueryBuilder
  const ItemQuery = new QueryBuilder(baseQuery, query).sort().paginate();

  const meta = await ItemQuery.countTotal();
  const result = await ItemQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getAllQuestionsGivenOnMyProductFromDB = async (sellerId: string) => {
  const user = await User.findById(sellerId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not exists!');
  }

  const result = await QuestionAndAnswerModel.find({ sellerId: user?._id });

  return result;
};

const getAllIMyQuestionsFromDB = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not exists!');
  }

  const result = await QuestionAndAnswerModel.find({ userId: user?._id });

  return result;
};

const getSingleQuestionAndAnswerFromDB = async (id: string) => {
  const result = await QuestionAndAnswerModel.findById(id);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This question is not exists!');
  }

  return result;
};

// const updateReviewInDB = async (
//   reviewId: string,
//   reviewData: Partial<TReview>,
// ) => {
//   const review = await ReviewModel.findById(reviewId);

//   if (!review) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'This review is not exists!');
//   }

//   const result = await ReviewModel.findByIdAndUpdate(reviewId, reviewData, {
//     new: true,
//   });

//   return result;
// };

// const updateReviewStatusInDB = async (id: string) => {
//   const review = await ReviewModel.findById(id);

//   if (review) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'This review is not exists!');
//   }

//   const result = await ReviewModel.findByIdAndUpdate(
//     id,
//     { status: 'Published' },
//     {
//       new: true,
//     },
//   );

//   return result;
// };

// const deleteSingleReviewFromDB = async (id: string) => {
//   const review = await ReviewModel.findById(id);

//   if (review) {
//     throw new AppError(StatusCodes.NOT_FOUND, 'This review is not exists!');
//   }

//   const result = await ReviewModel.findByIdAndDelete(id, {
//     new: true,
//   });

//   return result;
// };

export const QuestionAndAnswerServices = {
  createQuestionIntoDB,
  giveAnswerIntoDB,
  getAllProductQuestionsAndAnswersFromDB,
  getAllQuestionsGivenOnMyProductFromDB,
  getAllIMyQuestionsFromDB,
  getSingleQuestionAndAnswerFromDB,
};
