import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { ITransaction } from './transaction.interface';
import { ItemModel } from '../item/item.model';
import { User } from '../auth/auth.model';
import { TransactionModel } from './transaction.model';
import { transactionUtils } from './transaction.utils';

const createTransactionIntoDB = async (
  userId: string,
  transactionData: ITransaction,
  client_ip: string,
) => {
  if (!transactionData?.items?.length) {
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Order is not specified');
  }

  const userExists = await User.findById(userId);
  if (!userExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Please create your account!');
  }

  const items = transactionData.items;

  const itemsArray = await Promise.all(
    items.map(async (item) => {
      const itemData = await ItemModel.findById(item.itemId);

      if (!itemData) {
        throw new AppError(
          StatusCodes.NOT_FOUND,
          `Item with ID ${item.itemId} not found`,
        );
      }

      const orderedQuantity = item.quantity || 1;

      if (itemData.quantity < orderedQuantity) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          `Only ${itemData.quantity} item(s) available for "${itemData.title}".`,
        );
      }

      // Determine price using offerPrice
      const unitPrice =
        itemData.offerPrice && itemData.offerPrice > 0
          ? itemData.price - itemData.offerPrice
          : itemData.price;

      const subTotal = unitPrice * orderedQuantity;

      // Reduce stock
      itemData.quantity -= orderedQuantity;
      await itemData.save();

      return {
        itemId: item.itemId,
        sellerId: item.sellerId,
        price: subTotal,
        quantity: orderedQuantity,
        subTotal,
      };
    }),
  );

  const totalPrice = itemsArray.reduce((acc, item) => acc + item.subTotal, 0);

  const orderData = {
    buyerId: userId,
    items: itemsArray,
    name: userExists.name,
    email: userExists.email,
    phone: userExists.phone,
    address: userExists.address,
    shippingPhone: transactionData.phone || userExists.phone,
    shippingAddress: transactionData.address || userExists.address,
    totalPrice,
  };

  let result = await TransactionModel.create(orderData);

  // Payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: result?._id,
    currency: 'BDT',
    customer_name: userExists.name,
    customer_address: orderData.address,
    customer_email: userExists.email,
    customer_phone: orderData.phone || userExists.phone,
    customer_city: orderData.address,
    client_ip,
  };

  const payment = await transactionUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    const updatedOrder = await TransactionModel.findOneAndUpdate(
      { _id: result._id },
      {
        transaction: {
          id: payment.sp_order_id,
          transactionStatus: payment.transactionStatus,
        },
      },
      { new: true },
    );

    if (!updatedOrder) {
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Failed to update the order!',
      );
    }

    result = updatedOrder;
  }

  return { result, payment };
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await transactionUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await TransactionModel.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
        transactionStatus:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Pending'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
      {
        new: true,
      },
    );
  }

  return verifiedPayment;
};

const getMyPurchaseHistoryFromDB = async (myId: string) => {
  const result = await TransactionModel.find({ buyerId: myId });

  return result;
};

const getAllPaidTransactionsFromDB = async () => {
  const result = await TransactionModel.find({ status: 'Paid' });

  return result;
};

const getMySalesHistoryFromDB = async (myId: string) => {
  const result = await TransactionModel.find({ 'items.sellerId': myId });
  return result;
};

const updateTransactionStatusIntoDB = async (id: string) => {
  const result = await TransactionModel.findByIdAndUpdate(
    id,
    {
      transactionStatus: 'Completed',
    },
    { new: true },
  );

  return result;
};

export const TransactionServices = {
  createTransactionIntoDB,
  verifyPayment,
  getMyPurchaseHistoryFromDB,
  getMySalesHistoryFromDB,
  updateTransactionStatusIntoDB,
  getAllPaidTransactionsFromDB,
};
