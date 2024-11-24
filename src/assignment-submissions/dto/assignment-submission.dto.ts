import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AssignmentsDto } from '../../assignments/dto/assignments.dto';
import { Type } from 'class-transformer';

export class AssignmentSubmissionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({ type: AssignmentsDto })
  @IsOptional()
  @Type(() => AssignmentsDto)
  assignment?: AssignmentsDto;
}
