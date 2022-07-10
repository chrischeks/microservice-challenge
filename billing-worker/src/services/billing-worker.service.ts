import { AppDataSource } from '@/database';
import { Transaction } from '@/entities/transaction.entity';
import { HttpException } from '@/exceptions/httpException';
import { TransactionDetails, TransactionStatusTypes } from '@/interfaces/billing-worker.interface';
import { setTimeout } from 'timers/promises';

class BillWorkerService {
  public updateTransaction = async (body: TransactionDetails): Promise<Transaction> => {
    try {
      let transaction = await AppDataSource.getRepository(Transaction).findOne({ where: { id: body.transactionId } });

      if (!transaction) {
        throw new HttpException(400, `No transaction was not found for this id`, body.transactionId);
      }

      if (body.status !== TransactionStatusTypes.Pending) {
        throw new HttpException(400, `Invalid transaction status`, body.status);
      }

      await this.charge();

      transaction.status = TransactionStatusTypes.Success;

      transaction = await AppDataSource.getRepository(Transaction).save(transaction);

      return transaction;
    } catch (error) {
      throw error;
    }
  };

  private charge = async (): Promise<void> => {
    await setTimeout(100);
  };
}

export default BillWorkerService;
