import { NextFunction, Request, Response } from 'express';
import { TransactionDetailsDto } from '../dto/billing.dto';
import BillingService from '../service/billing.service';
import createMQPublisher from '@/publisher';
import { AMQP_URL, QUEUE_NAME } from '@/config';

class BillingController {
  private publisher = createMQPublisher(AMQP_URL, QUEUE_NAME);
  private billingService = new BillingService(this.publisher);

  public createTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const body: TransactionDetailsDto = req.body;

    try {
      const response = await this.billingService.createTransaction(body);
      res.status(200).json({ message: 'Success', status: true, data: response });
    } catch (error) {
      next(error);
    }
  };
}

export default BillingController;
