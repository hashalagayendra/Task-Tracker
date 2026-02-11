import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskStatus, TaskPriority } from '@prisma/client';

export class CreateTaskDto {
  @ApiProperty({ required: true, example: 'Complete project report' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false, example: 'Draft the final report for Q1' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.notStarted })
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;

  @ApiProperty({ enum: TaskPriority, example: TaskPriority.medium })
  @IsEnum(TaskPriority)
  @IsNotEmpty()
  priority: TaskPriority;

  @ApiProperty({ required: false, example: 'user-uuid-1234' })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({ required: false, example: '2023-10-27T10:00:00Z' })
  @IsDateString()
  @IsOptional()
  startTime?: Date;

  @ApiProperty({ required: false, example: '2023-10-27T12:00:00Z' })
  @IsDateString()
  @IsOptional()
  endTime?: Date;

  @ApiProperty({
    required: true,
    example: 60,
    description: 'Estimated time in minutes',
  })
  @IsNumber()
  estimatedTime: number;
}
