import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';

export class FilterCourseDto {
  @ApiPropertyOptional({ type: UserDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  courseCreators?: UserDto[] | null;
}

export class FindAllCoursesDto {
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
    value ? plainToInstance(FilterCourseDto, JSON.parse(value)) : undefined,
  )
  @ValidateNested()
  @Type(() => FilterCourseDto)
  filters?: FilterCourseDto | null;
}
