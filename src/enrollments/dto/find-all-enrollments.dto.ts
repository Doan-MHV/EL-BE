import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { CourseDto } from '../../courses/dto/course.dto';
import { UserDto } from '../../users/dto/user.dto';

export class FilterEnrollmentDto {
  @ApiPropertyOptional({ type: CourseDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CourseDto)
  courses?: CourseDto[] | null;

  @ApiPropertyOptional({ type: UserDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  students?: UserDto[] | null;
}

export class FindAllEnrollmentsDto {
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
    value ? plainToInstance(FilterEnrollmentDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterEnrollmentDto)
  filters?: FilterEnrollmentDto | null;
}
