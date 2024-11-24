import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FileDto } from '../../files/dto/file.dto';
import { IsOptional } from 'class-validator';
import { AssignmentsDto } from '../../assignments/dto/assignments.dto';
import { Type } from 'class-transformer';
import { UserDto } from '../../users/dto/user.dto';

export class CreateAssignmentSubmissionDto {
  @ApiProperty()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ type: () => UserDto })
  @IsOptional()
  student?: UserDto | null;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  file?: FileDto | null;

  @ApiProperty({ type: AssignmentsDto })
  @IsOptional()
  @Type(() => AssignmentsDto)
  assignment?: AssignmentsDto;
}
