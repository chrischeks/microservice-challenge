import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class FundingDetailsDto {
  @IsString()
  @IsMongoId()
  customerId: string;

  @IsNumber()
  amount: number;
}
