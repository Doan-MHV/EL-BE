import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { AssignmentsDto } from '../../assignments/dto/assignments.dto';

export class FilterAssignmentMaterialsDto {
  @ApiPropertyOptional({ type: AssignmentsDto })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AssignmentsDto)
  assignments?: AssignmentsDto[] | null;
}

export class FindAllAssignmentMaterialsDto {
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
      ? plainToInstance(FilterAssignmentMaterialsDto, JSON.parse(value))
      : undefined,
  )
  @ValidateNested()
  @Type(() => FilterAssignmentMaterialsDto)
  filters?: FilterAssignmentMaterialsDto | null;
}
