import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { FrameworkService } from './framework.service';
import { CreateFrameworksDto, UpdateFrameworkDto } from './dto/framework.dto';
import { Framework } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
import { Role } from 'src/auth/entity/role.entity';

@Controller('framework')
export class FrameworkController {
  constructor(private readonly frameworkService: FrameworkService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async create(@Body(ValidationPipe) createFrameworksDto: CreateFrameworksDto) {
    const response: Framework[] = [];
    for (const createFrameworkDto of createFrameworksDto.frameworks) {
      try {
        const newFramework: Framework =
          await this.frameworkService.create(createFrameworkDto);
        response.push(newFramework);
      } catch (error) {
        console.log(error);
        continue;
      }
    }
    return response;
  }

  @Get()
  findAll() {
    return this.frameworkService.findAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFrameworkDto: UpdateFrameworkDto,
  ) {
    return this.frameworkService.update(id, updateFrameworkDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.frameworkService.remove(id);
  }
}
