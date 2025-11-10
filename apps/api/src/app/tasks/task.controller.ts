import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '../../entities/task.entity';
import { User } from '../../entities/user.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Post()
  async create(@Body() body: Partial<Task>, @Request() req: any): Promise<Task> {
    const user = req.user as User; // adjust if using auth later
    return this.taskService.create(body, user);
  }
}
