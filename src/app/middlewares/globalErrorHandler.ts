/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { Status } from 'better-status-codes';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const message = err.message || 'Something went wrong !!!';

  res.status(Status.INTERNAL_SERVER_ERROR).json({
    success: false,
    message,
    error: err,
  });
  return;
};
export default globalErrorHandler;
