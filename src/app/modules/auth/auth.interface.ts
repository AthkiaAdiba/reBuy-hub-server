/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './auth.constant';

export interface TUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  image: string;
  role: 'admin' | 'user';
  status: 'ban' | 'unBan';
  isDeleted: boolean;
}

export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserModel extends Model<TUser> {
  isUserExists(email: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
