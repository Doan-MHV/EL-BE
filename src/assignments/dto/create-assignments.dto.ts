import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CourseDto } from 'src/courses/dto/course.dto';

export class CreateAssignmentsDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  maxGrade: number;

  @ApiProperty()
  @IsOptional()
  status?: string;

  @ApiProperty()
  @IsNotEmpty()
  deadline: Date;

  @ApiProperty({ type: CourseDto })
  @IsOptional()
  @Type(() => CourseDto)
  course?: CourseDto | null;
}
