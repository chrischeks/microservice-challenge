import { Transaction, TransactionDetails, TransactionStatusTypes } from '@/interfaces/billing.interface';
import { model, Schema, Document } from 'mongoose';

const transactionSchema: Schema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(TransactionStatusTypes),
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

const transactionModel = model<Transaction & Document>('transactions', transactionSchema);

export default transactionModel;
