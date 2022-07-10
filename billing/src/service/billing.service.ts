import { TransactionDetailsDto } from '../dto/billing.dto';
import { Transaction } from '@/entities/transaction.entity';
import { TransactionStatusTypes } from '../interfaces/billing.interface';
import { AppDataSource } from '@/databases';
import { HttpException } from '@/exceptions/httpException';

class BillingService {
  private publisher: (msg: string) => void;

  constructor(publisher: (msg: string) => void) {
    this.publisher = publisher;
  }

  public createTransaction = async (body: TransactionDetailsDto): Promise<Transaction> => {
    const { reference, customerId, amount } = body;
    try {
      let transaction = await AppDataSource.getRepository(Transaction).findOne({ where: { reference, customerId } });

      if (transaction) throw new HttpException(400, 'Possibly a duplicate transaction', reference);

      const createTransactionObj: Partial<Transaction> = {
        status: TransactionStatusTypes.Pending,
        amount,
        customerId,
        reference,
      };

      const createTransaction = AppDataSource.getRepository(Transaction).create(createTransactionObj);
      transaction = await AppDataSource.getRepository(Transaction).save(createTransaction);

      createTransactionObj['transactionId'] = transaction.id;

      this.publisher(JSON.stringify(createTransactionObj));

      return transaction;
    } catch (error) {
      throw error;
    }
  };
}

export default BillingService;
