import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TSubscribe } from './subscribe.interface';
import { SubscribeModel } from './subscribe.model';

const createSubscribeIntoDB = async (payload: TSubscribe) => {
  const isAlreadySubscribe = await SubscribeModel.findOne({
    userEmail: payload.userEmail,
  });

  if (isAlreadySubscribe) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'You have already subscribed!');
  }

  const result = await SubscribeModel.create(payload);

  return result;
};

const getAllSubscribesUsersFromDB = async () => {
  const result = await SubscribeModel.find();

  return result;
};

export const SubscribeServices = {
  createSubscribeIntoDB,
  getAllSubscribesUsersFromDB,
};
