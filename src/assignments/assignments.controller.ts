import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentsDto } from './dto/create-assignments.dto';
import { UpdateAssignmentsDto } from './dto/update-assignments.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Assignments } from './domain/assignments';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllAssignmentsDto } from './dto/find-all-assignments.dto';
import { Request } from 'express';

@ApiTags('Assignments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'assignments',
  version: '1',
})
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Assignments,
  })
  create(@Body() createAssignmentsDto: CreateAssignmentsDto) {
    return this.assignmentsService.create(createAssignmentsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Assignments),
  })
  async findAll(
    @Query() query: FindAllAssignmentsDto,
  ): Promise<InfinityPaginationResponseDto<Assignments>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.assignmentsService.findAllWithPagination({
        filterOptions: query?.filters,
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
    type: Assignments,
  })
  findById(@Param('id') id: string, @Req() req: Request) {
    return this.assignmentsService.findById(id, req.user?.['id']);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Assignments,
  })
  update(
    @Param('id') id: string,
    @Body() updateAssignmentsDto: UpdateAssignmentsDto,
  ) {
    return this.assignmentsService.update(id, updateAssignmentsDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.assignmentsService.remove(id);
  }
}
