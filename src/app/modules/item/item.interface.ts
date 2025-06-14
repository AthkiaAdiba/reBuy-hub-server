import { Types } from 'mongoose';

export type TITem = {
  title: string;
  description: string;
  price: number;
  condition: string;
  images: string[];
  sellerId: Types.ObjectId;
  status?: 'available' | 'sold';
  category: Types.ObjectId;
  offerPrice: number;
  quantity: number;
  location: string;
  averageRating: number;
};
