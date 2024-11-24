import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { AssignmentsDto } from '../../assignments/dto/assignments.dto';

export class FilterAssignmentSubmissionsDto {
  @ApiPropertyOptional({ type: AssignmentsDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AssignmentsDto)
  assignments?: AssignmentsDto[] | null;
}

export class FindAllAssignmentSubmissionsDto {
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
      ? plainToInstance(FilterAssignmentSubmissionsDto, JSON.parse(value))
      : undefined,
  )
  @ValidateNested()
  @Type(() => FilterAssignmentSubmissionsDto)
  filters?: FilterAssignmentSubmissionsDto | null;
}
