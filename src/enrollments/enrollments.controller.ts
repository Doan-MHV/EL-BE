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
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Enrollment } from './domain/enrollment';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllEnrollmentsDto } from './dto/find-all-enrollments.dto';
import { Course } from '../courses/domain/course';
import { Request } from 'express';

@ApiTags('Enrollments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'enrollments',
  version: '1',
})
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Enrollment,
  })
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(createEnrollmentDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Enrollment),
  })
  async findAll(
    @Query() query: FindAllEnrollmentsDto,
  ): Promise<InfinityPaginationResponseDto<Enrollment>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.enrollmentsService.findAllWithPagination({
        filterOptions: query?.filters,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get('/my-courses')
  @ApiOkResponse({
    type: InfinityPaginationResponse(Course),
  })
  async findAllCourses(
    @Req() req: Request,
    @Query() query: FindAllEnrollmentsDto,
  ): Promise<InfinityPaginationResponseDto<Course>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.enrollmentsService.findAllCoursesWithPagination({
        studentId: req.user?.['id'],
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
    type: Enrollment,
  })
  findById(@Param('id') id: string) {
    return this.enrollmentsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Enrollment,
  })
  update(
    @Param('id') id: string,
    @Body() updateEnrollmentDto: UpdateEnrollmentDto,
  ) {
    return this.enrollmentsService.update(id, updateEnrollmentDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.enrollmentsService.remove(id);
  }
}
