import { IsNumber, IsString } from 'class-validator';

export class TransactionDetailsDto {
  @IsString()
  customerId: string;

  @IsNumber()
  amount: number;

  @IsString()
  reference: string;
}
