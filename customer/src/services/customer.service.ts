import { FundingDetailsDto } from '../dtos/customer.dto';

import axios from 'axios';
import { generateRandomString } from '@/utils/utils';
import { Customer, AccountFundingResponse } from '@/interfaces/customer.route';
import customerModel from '@/models/customer.model';
import { HttpException } from '@/exceptions/httpException';
import { BILLING_BASE_URL } from '@/config';

class CustomerService {
  private customers = customerModel;

  public fundAccount = async (body: FundingDetailsDto): Promise<FundingDetailsDto> => {
    try {
      const customer: Customer = await this.customers.findOne({ _id: body.customerId });
      if (!customer) throw new HttpException(400, `No customer with the customerId: ${body.customerId} was not found`, body.customerId);
      const reference = generateRandomString(24);

      const result = await axios.post<AccountFundingResponse>(
        `${BILLING_BASE_URL}/billing/account-funding`,
        { ...body, reference },
        {
          validateStatus: status => {
            return status < 500;
          },
        },
      );

      const { message, data, status } = result.data;

      if (status === false) {
        throw new HttpException(400, message, data);
      }
      return body;
    } catch (error) {
      throw error;
    }
  };
}

export default CustomerService;
