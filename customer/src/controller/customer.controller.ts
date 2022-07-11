import { NextFunction, Request, Response } from 'express';
import { FundingDetailsDto } from '../dtos/customer.dto';
import CustomerService from '../services/customer.service';

class CustomerController {
  private customerService = new CustomerService();

  public fundAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const body: FundingDetailsDto = req.body;

    try {
      const fundingDetails = await this.customerService.fundAccount(body);
      res.status(200).json({ message: 'Success', status: true, data: fundingDetails });
    } catch (error) {
      next(error);
    }
  };
}

export default CustomerController;
