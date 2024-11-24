import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../../courses/domain/course';

export class Quizzes {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  title: string;

  @ApiProperty({
    type: () => Course,
  })
  course?: Course | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
