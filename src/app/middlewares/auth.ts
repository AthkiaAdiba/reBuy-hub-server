import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/auth/auth.interface';
import { User } from '../modules/auth/auth.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // if the token is sent from the client
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    // check if the token is valid
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    } catch (err) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized!');
    }

    const { role, userEmail } = decoded;

    //   checking if the user is exists
    const user = await User.isUserExists(userEmail);

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found!');
    }

    //   checking if user is already delete
    const iDeleted = user?.isDeleted;

    if (iDeleted) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted!');
    }

    // //   checking if user is already blocked
    const userStatus = user?.status;

    if (userStatus === 'ban') {
      throw new AppError(StatusCodes.NOT_FOUND, 'The user is Banned!');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
    }

    // decoded undefined
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
