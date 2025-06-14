/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { User } from '../auth/auth.model';
import { ItemModel } from '../item/item.model';
import { SubscribeModel } from '../subscribe/subscribe.model';
import { TransactionModel } from '../transaction/transaction.model';

const adminOverviewFromDB = async () => {
  const totalUsers = await User.countDocuments();
  const totalSubscribesUsers = await SubscribeModel.countDocuments();
  const totalContents = await ItemModel.countDocuments();
  const totalTransactions = await TransactionModel.countDocuments();

  const result = await TransactionModel.aggregate([
    {
      $match: { status: 'Paid' },
    },
    {
      $group: {
        _id: null,
        totalEarning: { $sum: '$totalPrice' },
      },
    },
  ]);

  const totalEarnings = result[0]?.totalEarning || 0;

  return {
    totalUsers,
    totalSubscribesUsers,
    totalContents,
    totalTransactions,
    totalEarnings,
  };
};

const userOverviewFromDB = async (sellerId: string) => {
  const sellerObjectId = new mongoose.Types.ObjectId(sellerId);

  // Count how many products the seller owns
  const totalContents = await ItemModel.countDocuments({
    sellerId: sellerObjectId,
  });

  // Find all 'Paid' transactions that include at least one item from this seller
  const paidTransactions = await TransactionModel.find({
    status: 'Paid',
    'items.sellerId': sellerObjectId,
  }).lean();

  const totalTransactions = paidTransactions.length;

  let totalEarnings = 0;
  const sellerItems: any[] = [];

  paidTransactions.forEach((transaction) => {
    transaction.items.forEach((item) => {
      if (item.sellerId.toString() === sellerId) {
        totalEarnings += item.price;

        sellerItems.push({
          ...item,
          transactionCreatedAt: transaction.createdAt,
          transactionUpdatedAt: transaction.updatedAt,
          transactionId: transaction._id,
          buyerId: transaction.buyerId,
          status: transaction.status,
        });
      }
    });
  });

  return {
    totalContents,
    totalTransactions,
    totalEarnings,
    sellerItems,
  };
};

export const OverviewServices = {
  adminOverviewFromDB,
  userOverviewFromDB,
};
