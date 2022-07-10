export enum TransactionStatusTypes {
  Pending = 'pending',
  Success = 'success',
}

export class TransactionDetails {
  customerId: string;
  transactionId: string;
  amount: number;
  status: string;
}
