/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from 'express';
import { Status } from 'better-status-codes';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(Status[404]).json({
    success: false,
    message: 'API Not Found !!',
    error: '',
  });
};

export default notFound;
