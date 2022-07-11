import transactionModel from '@/models/transaction.model';
import { HttpException } from '@/exceptions/httpException';
import { Transaction, TransactionDetails, TransactionStatusTypes } from '@/interfaces/billing-worker.interface';
import { setTimeout } from 'timers/promises';

class BillWorkerService {
  private transactions = transactionModel;

  public updateTransaction = async (body: TransactionDetails): Promise<Transaction> => {
    try {
      let transaction = await this.transactions.findOne<Transaction>({ _id: body.transactionId });

      if (!transaction) {
        throw new HttpException(400, `No transaction was not found for this id`, body.transactionId);
      }

      if (body.status !== TransactionStatusTypes.Pending) {
        throw new HttpException(400, `Invalid transaction status`, body.status);
      }

      await this.charge();

      await this.transactions.updateOne({ _id: body.transactionId }, { status: TransactionStatusTypes.Success });

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
