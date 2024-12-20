import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { CourseDto } from '../../courses/dto/course.dto';

export class FilterQuizDto {
  @ApiPropertyOptional({ type: CourseDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CourseDto)
  courses?: CourseDto[] | null;
}

export class FindAllQuizzesDto {
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
    value ? plainToInstance(FilterQuizDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterQuizDto)
  filters?: FilterQuizDto | null;
}
