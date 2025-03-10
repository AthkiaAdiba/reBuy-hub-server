import { TUser } from '../auth/auth.interface';
import { User } from '../auth/auth.model';

const getAllUsersFromDB = async () => {
  const result = await User.find();

  return result;
};

const getSingleIUserFromDB = async (id: string) => {
  const result = await User.findById(id);

  return result;
};

const updateUserInDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

const deleteSingleUserFromDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );

  return result;
};

const banUserIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { status: 'ban' },
    {
      new: true,
    },
  );

  return result;
};

export const UserServices = {
  getAllUsersFromDB,
  getSingleIUserFromDB,
  updateUserInDB,
  deleteSingleUserFromDB,
  banUserIntoDB,
};
