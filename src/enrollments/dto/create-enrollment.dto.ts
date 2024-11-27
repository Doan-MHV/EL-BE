import { ApiProperty } from '@nestjs/swagger';
import { CourseDto } from '../../courses/dto/course.dto';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from '../../users/dto/user.dto';

export class CreateEnrollmentDto {
  @ApiProperty({ type: CourseDto })
  @IsNotEmpty()
  @Type(() => CourseDto)
  course: CourseDto | null;

  @ApiProperty({ type: UserDto })
  @IsNotEmpty()
  @Type(() => UserDto)
  student: UserDto | null;
}
