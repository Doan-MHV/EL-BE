import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CourseDto } from '../../courses/dto/course.dto';
import { Type } from 'class-transformer';
import { UserDto } from '../../users/dto/user.dto';
import { AssignmentsDto } from '../../assignments/dto/assignments.dto';
import { QuizzesDto } from '../../quizzes/dto/quizzes.dto';

export class CreateGradeDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  feedback?: string;

  @ApiProperty()
  @IsNotEmpty()
  grade: number;

  @ApiProperty()
  @IsNotEmpty()
  maxGrade: number;

  @ApiProperty({ type: CourseDto })
  @IsOptional()
  @Type(() => CourseDto)
  course?: CourseDto | null;

  @ApiProperty({ type: UserDto })
  @IsOptional()
  @Type(() => UserDto)
  student?: UserDto | null;

  @ApiProperty({ type: AssignmentsDto })
  @IsOptional()
  @Type(() => AssignmentsDto)
  assignment?: AssignmentsDto | null;

  @ApiProperty({ type: QuizzesDto })
  @IsOptional()
  @Type(() => QuizzesDto)
  quiz?: QuizzesDto | null;
}
