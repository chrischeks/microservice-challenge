import { Router } from 'express';
import Route from '@/interfaces/route.interface';
import validationMiddleware from '@/middlewares/validation.middleware';
import BillingController from '../controller/billing.controller';
import { TransactionDetailsDto } from '../dto/billing.dto';

class BillingRoute implements Route {
  public path = '/billing';

  public router = Router();
  public billingController = new BillingController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/account-funding`, validationMiddleware(TransactionDetailsDto, 'body'), this.billingController.createTransaction);
  }
}

export default BillingRoute;
