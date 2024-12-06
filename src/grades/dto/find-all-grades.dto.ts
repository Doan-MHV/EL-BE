import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { UserDto } from '../../users/dto/user.dto';
import { CourseDto } from '../../courses/dto/course.dto';

export class FilterGradesDto {
  @ApiPropertyOptional({ type: UserDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  students?: UserDto[] | null;

  @ApiPropertyOptional({ type: CourseDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CourseDto)
  courses?: CourseDto[] | null;
}

export class FindAllGradesDto {
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
    value ? plainToInstance(FilterGradesDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterGradesDto)
  filters?: FilterGradesDto | null;
}
