import { ApiProperty } from '@nestjs/swagger';
import { Assignments } from 'src/assignments/domain/assignments';
import { Lecture } from 'src/lectures/domain/lecture';
import { User } from 'src/users/domain/user';

export class Course {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  courseName: string;

  @ApiProperty({ type: String })
  categoryType?: string;

  @ApiProperty({ type: Number })
  coursePrice?: number;

  @ApiProperty({ type: () => User })
  courseCreator?: User | null;

  @ApiProperty({
    type: () => [Lecture],
  })
  courseLectures?: Lecture[];

  @ApiProperty({
    type: () => [Assignments],
  })
  courseAssignments?: Assignments[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
