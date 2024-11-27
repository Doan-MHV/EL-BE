import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizzesDto } from './dto/create-quizzes.dto';
import { UpdateQuizzesDto } from './dto/update-quizzes.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Quizzes } from './domain/quizzes';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllQuizzesDto } from './dto/find-all-quizzes.dto';

@ApiTags('Quizzes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'quizzes',
  version: '1',
})
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Quizzes,
  })
  create(@Body() createQuizzesDto: CreateQuizzesDto) {
    return this.quizzesService.create(createQuizzesDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Quizzes),
  })
  async findAll(
    @Query() query: FindAllQuizzesDto,
  ): Promise<InfinityPaginationResponseDto<Quizzes>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.quizzesService.findAllWithPagination({
        filterOptions: query.filters,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Quizzes,
  })
  findById(@Param('id') id: string) {
    return this.quizzesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Quizzes,
  })
  update(@Param('id') id: string, @Body() updateQuizzesDto: UpdateQuizzesDto) {
    return this.quizzesService.update(id, updateQuizzesDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.quizzesService.remove(id);
  }
}
