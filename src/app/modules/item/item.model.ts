import { model, Schema } from 'mongoose';
import { TITem } from './item.interface';

const itemSchema = new Schema<TITem>(
  {
    title: {
      type: String,
      required: [true, 'Item title is required!'],
    },
    description: {
      type: String,
      required: [true, 'Item description is required!'],
    },
    price: {
      type: Number,
      required: [true, 'Item price is required!'],
    },
    condition: {
      type: String,
      required: [true, 'Item condition is required!'],
    },
    images: [
      {
        type: String,
        required: [true, 'Item image is required!'],
      },
    ],
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['available', 'sold'],
      default: 'available',
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Item category is required!'],
    },
    offerPrice: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      required: [true, 'Item quantity is required!'],
    },
    location: {
      type: String,
      required: [true, 'Item location is required!'],
      trim: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const ItemModel = model<TITem>('Item', itemSchema);
