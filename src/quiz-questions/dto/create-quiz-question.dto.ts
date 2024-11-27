import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateQuizQuestionDto {
  @ApiProperty()
  @IsNotEmpty()
  questionText: string;

  @ApiProperty()
  @IsNotEmpty()
  options: string[];

  @ApiProperty()
  @IsNotEmpty()
  answer: string;

  @ApiProperty()
  @IsNotEmpty()
  quizId: string;
}
