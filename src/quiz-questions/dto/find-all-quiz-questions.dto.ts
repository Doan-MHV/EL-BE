import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { plainToInstance, Transform, Type } from 'class-transformer';

export class FilterQuizQuestionsDto {
  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  quizzes?: string[] | null;
}

export class FindAllQuizQuestionsDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 1))
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional()
  @Transform(({ value }) => (value ? Number(value) : 10))
  @IsNumber()
  @IsOptional()
  limit?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @Transform(({ value }) =>
    value
      ? plainToInstance(FilterQuizQuestionsDto, JSON.parse(value))
      : undefined,
  )
  @ValidateNested()
  @Type(() => FilterQuizQuestionsDto)
  filters?: FilterQuizQuestionsDto | null;
}
