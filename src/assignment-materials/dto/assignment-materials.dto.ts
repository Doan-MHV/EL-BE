import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AssignmentMaterialsDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
