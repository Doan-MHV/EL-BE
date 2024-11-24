import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class QuizzesDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
