import {
  Controller, Get, Post, Put, Delete,
  Body, Param, UseGuards, Request
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { Roles } from '../../auth/roles.decorator';
import { UserRole } from '../../entities/user.entity';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Everyone (Owner/Admin/Viewer) can view
  @Get()
  findAll() {
    return this.taskService.getAllTasks();
  }

  // Only Owner/Admin can create
  @Post()
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  create(@Body() body, @Request() req) {
    return this.taskService.createTask(body.title, body.description, req.user);
  }

  // Only Owner/Admin can update
  @Put(':id')
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  update(@Param('id') id: string, @Body() body) {
    return this.taskService.updateTask(id, body);
  }

  // Only Owner/Admin can delete
  @Delete(':id')
  @Roles(UserRole.OWNER, UserRole.ADMIN)
  delete(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
