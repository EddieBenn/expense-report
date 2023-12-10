import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReportDto, ReportResponseDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportType, data } from 'src/data';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ReportService {
  create(
    type: ReportType,
    createReportDto: CreateReportDto,
  ): ReportResponseDto {
    const newReport = {
      id: uuid(),
      source: createReportDto.source,
      amount: createReportDto.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  findAll(type: ReportType): ReportResponseDto[] {
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  findOne(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!report) {
      throw new HttpException(`Report not found`, HttpStatus.NOT_FOUND);
    }

    return new ReportResponseDto(report);
  }

  update(
    type: ReportType,
    id: string,
    updateReportDto: UpdateReportDto,
  ): ReportResponseDto {
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!reportToUpdate) {
      throw new HttpException(`Report not found`, HttpStatus.NOT_FOUND);
    }

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...updateReportDto,
      updated_at: new Date(),
    };
    return new ReportResponseDto(data.report[reportIndex]);
  }

  remove(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) {
      throw new HttpException(`Report not found`, HttpStatus.NOT_FOUND);
    }

    data.report.splice(reportIndex, 1);

    return;
  }
}
