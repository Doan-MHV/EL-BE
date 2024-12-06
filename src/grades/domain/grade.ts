import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../../courses/domain/course';
import { Assignments } from '../../assignments/domain/assignments';
import { Quizzes } from '../../quizzes/domain/quizzes';
import { User } from '../../users/domain/user';

export class Grade {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  feedback?: string;

  @ApiProperty({ type: Number })
  grade?: number;

  @ApiProperty({ type: Number })
  maxGrade?: number;

  @ApiProperty({
    type: () => Course,
  })
  course?: Course | null;

  @ApiProperty({
    type: () => Assignments,
  })
  assignment?: Assignments | null;

  @ApiProperty({
    type: () => Quizzes,
  })
  quiz?: Quizzes | null;

  @ApiProperty({
    type: () => User,
  })
  student?: User | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
