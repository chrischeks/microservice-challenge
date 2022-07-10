import { Customer } from '@/interfaces/customer.route';
import { model, Schema, Document } from 'mongoose';

const customerSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: String,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

const customerModel = model<Customer & Document>('Customer', customerSchema);

export default customerModel;
