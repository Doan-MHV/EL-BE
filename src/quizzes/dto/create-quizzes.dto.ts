import { ApiProperty } from '@nestjs/swagger';
import { CourseDto } from '../../courses/dto/course.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQuizzesDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: CourseDto })
  @IsOptional()
  @Type(() => CourseDto)
  course?: CourseDto | null;
}
