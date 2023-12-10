import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';
import { ReportType } from 'src/data';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}

export class ReportResponseDto {
  id: string;
  source: string;
  amount: number;

  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  type: ReportType;

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}