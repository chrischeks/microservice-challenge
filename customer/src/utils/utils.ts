import IResponse from '@/interfaces/response.interface';
import { Response } from 'express';

export const generateRandomString = (length: number): string => {
  const dict = '0123456789ABCDEFGHJKLMNOPQRSTUVWXYZ';

  let result = '';
  for (let i = length; i > 0; i -= 1) {
    result += dict[Math.round(Math.random() * (dict.length - 1))];
  }
  return result;
};

export const controllerResponseHandler = (response: IResponse<any, string>, res: Response) => {
  const { statusCode, status, message, data } = response;
  return res.status(statusCode).json({ status, message, data });
};

export const successResponse = (message = 'success', data = null): IResponse<any, string> => {
  return { statusCode: 200, status: true, message, data };
};

export const failureResponse = (message: string, data = null): IResponse<any, string> => {
  return { statusCode: 400, status: false, message, data };
};
