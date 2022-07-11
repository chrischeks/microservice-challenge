import { TransactionDetailsDto } from '../dto/billing.dto';
import { Transaction, TransactionStatusTypes } from '../interfaces/billing.interface';
import { HttpException } from '@/exceptions/httpException';
import transactionModel from '@/models/transaction.entity';

class BillingService {
  private publisher: (msg: string) => void;
  private transactions = transactionModel;

  constructor(publisher: (msg: string) => void) {
    this.publisher = publisher;
  }

  public createTransaction = async (body: TransactionDetailsDto): Promise<Transaction> => {
    const { reference, customerId, amount } = body;
    try {
      let transaction = await this.transactions.findOne({ reference, customerId });

      if (transaction) throw new HttpException(400, 'Possibly a duplicate transaction', reference);

      const createTransactionObj: Partial<Transaction> = {
        status: TransactionStatusTypes.Pending,
        amount,
        customerId,
        reference,
      };

      const createTransaction = await this.transactions.create(createTransactionObj);
      createTransactionObj['transactionId'] = createTransaction._id;

      this.publisher(JSON.stringify(createTransactionObj));

      return transaction;
    } catch (error) {
      throw error;
    }
  };
}

export default BillingService;
