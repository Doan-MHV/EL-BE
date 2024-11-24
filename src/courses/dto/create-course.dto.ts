import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserDto } from 'src/users/dto/user.dto';

export class CreateCourseDto {
  @ApiProperty()
  @IsNotEmpty()
  courseName: string;

  @ApiProperty()
  @IsOptional()
  categoryType?: string;

  @ApiProperty()
  @IsOptional()
  coursePrice?: number;

  @ApiProperty({ type: UserDto })
  @IsOptional()
  @Type(() => UserDto)
  courseCreator?: UserDto | null;
}
