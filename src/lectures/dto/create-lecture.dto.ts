import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CourseDto } from 'src/courses/dto/course.dto';
import { LectureDto } from './lecture.dto';

export class CreateLectureDto {
  @ApiProperty()
  @IsNotEmpty()
  lectureName: string;

  @ApiProperty()
  @IsNotEmpty()
  lectureTime: string;

  @ApiProperty()
  @IsOptional()
  lectureDate?: Date;

  @ApiProperty()
  @IsNotEmpty()
  markdownContent: string;

  @ApiProperty({ type: CourseDto })
  @IsOptional()
  @Type(() => CourseDto)
  course?: CourseDto | null;

  @ApiPropertyOptional({ type: () => LectureDto })
  @IsOptional()
  @Type(() => LectureDto)
  previousLecture?: LectureDto | null;
}
