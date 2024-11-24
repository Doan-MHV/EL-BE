import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { AssignmentsDto } from 'src/assignments/dto/assignments.dto';
import { FileDto } from 'src/files/dto/file.dto';

export class CreateAssignmentMaterialsDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ type: () => FileDto })
  @IsOptional()
  file?: FileDto | null;

  @ApiProperty({ type: AssignmentsDto })
  @IsOptional()
  @Type(() => AssignmentsDto)
  assignment?: AssignmentsDto;
}
