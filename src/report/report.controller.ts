import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseEnumPipe,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto, ReportResponseDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportType } from 'src/data';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  create(
    @Body() createReportDto: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.create(reportType, createReportDto);
  }

  @Get()
  findAll(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponseDto[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.findAll(reportType);
  }

  @Get(':id')
  findOne(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.findOne(reportType, id);
  }

  @Patch(':id')
  update(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReportDto: UpdateReportDto,
  ): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.update(reportType, id, updateReportDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.remove(id);
  }
}
