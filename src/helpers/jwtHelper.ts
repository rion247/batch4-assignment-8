import jwt, {
  type JwtPayload,
  type Secret,
  type SignOptions,
} from 'jsonwebtoken';

export type TUserInformationForJWT = {
  email: string;
  role: string;
};

const tokenGenerator = (
  userData: TUserInformationForJWT,
  secret: Secret,
  expiresIn: NonNullable<SignOptions['expiresIn']>,
) => {
  return jwt.sign(userData, secret, {
    expiresIn,
    algorithm: 'HS256',
  });
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const JwtHelpers = {
  verifyToken,
  tokenGenerator,
};
