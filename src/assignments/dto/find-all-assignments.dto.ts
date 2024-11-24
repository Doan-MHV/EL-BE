import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { CourseDto } from 'src/courses/dto/course.dto';

export class FilterAssignmentDto {
  @ApiPropertyOptional({ type: CourseDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CourseDto)
  courses?: CourseDto[] | null;
}

export class FindAllAssignmentsDto {
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
    value ? plainToInstance(FilterAssignmentDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterAssignmentDto)
  filters?: FilterAssignmentDto | null;
}
