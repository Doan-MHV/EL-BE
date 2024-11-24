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
    type: () => Lecture,
  })
  nextLecture?: Lecture | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
