export interface AccountFundingResponse {
  status: boolean;
  message: string;
  data:
    | string
    | {
        amount: string;
        reference: string;
        customerId: string;
        status: string;
        id: string;
        createdAt: string;
        updatedAt: string;
      };
}

export interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
