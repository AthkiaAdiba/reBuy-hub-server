import jwt, { SignOptions } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: {
    userId: string;
    userEmail: string;
    role: string;
    address: string;
    phone: string;
    name: string;
  },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, { expiresIn } as SignOptions);
};
