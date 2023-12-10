import { PartialType } from '@nestjs/mapped-types';
import { CreateReportDto } from './create-report.dto';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class UpdateReportDto extends PartialType(CreateReportDto) {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
}
