import type { ZodType } from 'zod';
import catchAsync from '../../shared/catchAsync';
import type { NextFunction, Request, Response } from 'express';

const validateRequest = (schema: ZodType) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      cookies: req.cookies,
    });
    next();
  });
};

export default validateRequest;
