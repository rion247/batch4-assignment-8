/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Something went wrong!!!';

  res.status(statusCode).json({
    success: false,
    message,
    error: err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
