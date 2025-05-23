import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { User } from '../auth/auth.model';
import { TReview } from './review.interface';
import { ReviewModel } from './review.model';

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

const getAllProductReviewsFromDB = async (productId: string) => {
  const result = await ReviewModel.find({
    publishedStatus: 'Published',
    productId: productId,
  });

  return result;
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

  if (review) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This review is not exists!');
  }

  const result = await ReviewModel.findByIdAndUpdate(
    id,
    { status: 'Published' },
    {
      new: true,
    },
  );

  return result;
};

const deleteSingleReviewFromDB = async (id: string) => {
  const review = await ReviewModel.findById(id);

  if (review) {
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
