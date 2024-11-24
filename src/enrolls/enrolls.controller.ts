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
import { EnrollsService } from './enrolls.service';
import { CreateEnrollDto } from './dto/create-enroll.dto';
import { UpdateEnrollDto } from './dto/update-enroll.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Enroll } from './domain/enroll';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllEnrollsDto } from './dto/find-all-enrolls.dto';

@ApiTags('Enrolls')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'enrolls',
  version: '1',
})
export class EnrollsController {
  constructor(private readonly enrollsService: EnrollsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Enroll,
  })
  create(@Body() createEnrollDto: CreateEnrollDto) {
    return this.enrollsService.create(createEnrollDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Enroll),
  })
  async findAll(
    @Query() query: FindAllEnrollsDto,
  ): Promise<InfinityPaginationResponseDto<Enroll>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.enrollsService.findAllWithPagination({
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
    type: Enroll,
  })
  findById(@Param('id') id: string) {
    return this.enrollsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Enroll,
  })
  update(@Param('id') id: string, @Body() updateEnrollDto: UpdateEnrollDto) {
    return this.enrollsService.update(id, updateEnrollDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.enrollsService.remove(id);
  }
}
