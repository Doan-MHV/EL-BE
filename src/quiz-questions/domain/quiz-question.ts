import { ApiProperty } from '@nestjs/swagger';

export class QuizQuestion {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  questionText: string;

  @ApiProperty({
    type: [String],
  })
  options: string[];

  @ApiProperty({
    type: String,
  })
  answer: string;

  @ApiProperty({
    type: String,
  })
  quizId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
