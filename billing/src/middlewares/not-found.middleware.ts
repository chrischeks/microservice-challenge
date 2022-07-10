import { NextFunction, Response, Request } from 'express';

const notFound = async (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ message: 'Route not found', status: false, data: null });
};

export default notFound;
