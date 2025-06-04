import { model, Schema } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>(
  {
    review: {
      type: String,
      required: [true, 'Review is required!'],
    },
    userName: {
      type: String,
      required: [true, 'User Name is required!'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required!'],
    },
    userEmail: {
      type: String,
      required: [true, 'User email is required!'],
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    userImage: {
      type: String,
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

export const ReviewModel = model<TReview>('Review', reviewSchema);
