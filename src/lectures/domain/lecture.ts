import { ApiProperty } from '@nestjs/swagger';
import { Course } from 'src/courses/domain/course';

export class Lecture {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  lectureName: string;

  @ApiProperty({
    type: String,
  })
  lectureTime: string;

  @ApiProperty({
    type: Date,
  })
  lectureDate?: Date;

  @ApiProperty({
    type: String,
  })
  markdownContent?: string;

  @ApiProperty({
    type: () => Course,
  })
  course?: Course | null;

  @ApiProperty({
    type: String,
  })
  previousLecture?: string | null;

  @ApiProperty({
    type: String,
  })
  nextLecture?: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
