import { model, Schema } from 'mongoose';
import { TCategory } from './category.interface';

const categorySchema = new Schema<TCategory>(
  {
    categoryName: {
      type: String,
      unique: true,
      required: [true, 'Category name is required!'],
    },
    categoryImage: {
      type: String,
      required: [true, 'Category image is required!'],
    },
  },
  {
    timestamps: true,
  },
);

export const CategoryModel = model<TCategory>('Category', categorySchema);
