import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GradeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
