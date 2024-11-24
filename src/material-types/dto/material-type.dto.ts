import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MaterialTypeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
