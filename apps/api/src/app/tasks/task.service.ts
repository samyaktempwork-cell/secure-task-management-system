import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.taskRepo.find({ relations: ['owner'] });
  }

  async create(taskData: Partial<Task>, user: User): Promise<Task> {
    const task = this.taskRepo.create({ ...taskData, owner: user });
    return this.taskRepo.save(task);
  }
}
