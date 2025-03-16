import { Types } from 'mongoose';

// items: {
//     itemId: Types.ObjectId;
//   }[];

export type ITransaction = {
  buyerId: Types.ObjectId;
  items: {
    itemId: Types.ObjectId;
    sellerId: Types.ObjectId;
    price: number;
  }[];
  totalPrice: number;
  transactionStatus: 'Pending' | 'Completed';
  status: 'Pending' | 'Paid' | 'Shipped' | 'Completed' | 'Cancelled';
  name?: string;
  email?: string;
  address?: string;
  phone?: string;
  shippingPhone?: string;
  shippingAddress?: string;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
};
