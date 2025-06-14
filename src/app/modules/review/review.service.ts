/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../auth/auth.model';
import { TReview } from './review.interface';
import { ReviewModel } from './review.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { ItemModel } from '../item/item.model';

const createReviewIntoDB = async (payload: TReview) => {
  const isAlreadyReviewed = await ReviewModel.findOne({
    userEmail: payload.userEmail,
    productId: payload.productId,
  });

  if (isAlreadyReviewed) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'You have already given a review for this product!',
    );
  }

  const result = await ReviewModel.create(payload);

  return result;
};

const getAllReviewsFromDB = async () => {
  const result = await ReviewModel.find();

  return result;
};

const getAllProductReviewsFromDB = async (productId: string, query: any) => {
  const baseQuery = ReviewModel.find({
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

const getAllIReviewsGivenOnMyProductFromDB = async (sellerId: string) => {
  const user = await User.findById(sellerId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not exists!');
  }

  const result = await ReviewModel.find({ sellerId: user?._id });

  return result;
};

const getAllIMyReviewsFromDB = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not exists!');
  }

  const result = await ReviewModel.find({ userEmail: user?._id });

  return result;
};

const getSingleReviewFromDB = async (reviewId: string) => {
  const result = await ReviewModel.findById(reviewId);

  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This review is not exists!');
  }

  return result;
};

const updateReviewInDB = async (
  reviewId: string,
  reviewData: Partial<TReview>,
) => {
  const review = await ReviewModel.findById(reviewId);

  if (!review) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This review is not exists!');
  }

  const result = await ReviewModel.findByIdAndUpdate(reviewId, reviewData, {
    new: true,
  });

  return result;
};

const updateReviewStatusInDB = async (id: string) => {
  const review = await ReviewModel.findById(id);

  if (!review) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This review does not exist!');
  }

  // Update the review's published status
  const result = await ReviewModel.findByIdAndUpdate(
    id,
    { publishedStatus: 'Published' },
    { new: true },
  );

  if (!result) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      'Failed to publish review',
    );
  }

  // After publishing, recalculate average rating
  const reviews = await ReviewModel.find({
    productId: result.productId,
    publishedStatus: 'Published',
  });

  let averageRating = 0;
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    averageRating = parseFloat((totalRating / reviews.length).toFixed(1));
  }

  // Update the item's averageRating
  await ItemModel.findByIdAndUpdate(
    result.productId,
    { averageRating },
    { new: true },
  );

  return result;
};

const deleteSingleReviewFromDB = async (id: string) => {
  const review = await ReviewModel.findById(id);

  if (!review) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This review is not exists!');
  }

  const result = await ReviewModel.findByIdAndDelete(id, {
    new: true,
  });

  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
  getAllReviewsFromDB,
  getAllIReviewsGivenOnMyProductFromDB,
  getAllIMyReviewsFromDB,
  getAllProductReviewsFromDB,
  getSingleReviewFromDB,
  updateReviewInDB,
  updateReviewStatusInDB,
  deleteSingleReviewFromDB,
};
