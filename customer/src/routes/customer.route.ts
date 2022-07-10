import { Router } from 'express';
import validationMiddleware from '@/middlewares/validation.middleware';
import CustomerController from '../controller/customer.controller';
import { FundingDetailsDto } from '../dtos/customer.dto';
import Route from '@/interfaces/route.interface';

class CustomerRoute implements Route {
  public path = '/customer';

  public router = Router();
  public customerController = new CustomerController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/account-funding`, validationMiddleware(FundingDetailsDto, 'body'), this.customerController.fundAccount);
  }
}

export default CustomerRoute;
