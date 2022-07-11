import { HttpException } from '@/exceptions/httpException';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  try {
    const status: number = error.status || 500;
    const message: string = error.message || 'Someting went wrong. Please contact support.';
    const data = error.data;
    res.status(status).json({ message, status: false, data });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
