import { model, Schema } from 'mongoose';
import { TSubscribe } from './subscribe.interface';

const subscribeSchema = new Schema<TSubscribe>(
  {
    userEmail: {
      type: String,
      required: [true, 'User email is required!'],
    },
  },
  {
    timestamps: true,
  },
);

export const SubscribeModel = model<TSubscribe>('Subscribe', subscribeSchema);
