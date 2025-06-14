import { model, Schema } from 'mongoose';
import { ITransaction } from './transaction.interface';

const transactionSchema = new Schema<ITransaction>(
  {
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    items: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: 'Item',
        },
        sellerId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        price: Number,
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    transactionStatus: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
    },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    shippingPhone: {
      type: String,
      trim: true,
    },
    shippingAddress: {
      type: String,
      trim: true,
    },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    },
  },
  {
    timestamps: true,
  },
);

export const TransactionModel = model<ITransaction>(
  'Transaction',
  transactionSchema,
);
