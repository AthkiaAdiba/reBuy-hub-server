import { model, Schema } from 'mongoose';
import { TContact } from './contact.interface';

const contactSchema = new Schema<TContact>(
  {
    userName: {
      type: String,
      required: [true, 'User name is required!'],
    },
    email: {
      type: String,
      required: [true, 'User email is required!'],
    },
    message: {
      type: String,
      required: [true, 'Message is required!'],
    },
  },
  {
    timestamps: true,
  },
);

export const ContactModel = model<TContact>('Contact', contactSchema);
