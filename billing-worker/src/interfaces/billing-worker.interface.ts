export enum TransactionStatusTypes {
  Pending = 'pending',
  Success = 'success',
}

export interface TransactionDetails {
  customerId: string;
  transactionId: string;
  amount: number;
  status: string;
}

export interface Transaction {
  _id: string;
  amount: number;
  reference: string;
  customerId: string;
  status: TransactionStatusTypes;
  isDeleted: Boolean;
  createdAt: Date;
  updatedAt: Date;
}
