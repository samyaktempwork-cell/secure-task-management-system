import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../entities/task.entity';
import { User } from '../../entities/user.entity';
import { AuditLogService } from '../audit-log.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    private readonly audit: AuditLogService, // <-- likely this one is undefined
  ) {}

  async createTask(title: string, description: string, owner: User) {
  const task = this.taskRepo.create({ title, description, owner });
  const saved = await this.taskRepo.save(task);
  await this.audit.record('CREATE', 'Task', saved.id, owner.email);
  return saved;
  } 

  async getAllTasks() {
    return this.taskRepo.find({ relations: ['owner'] });
  }

  async getTaskById(id: string) {
    return this.taskRepo.findOne({ where: { id }, relations: ['owner'] });
  }

  async updateTask(id: string, updateData: Partial<Task>) {
  await this.taskRepo.update(id, updateData);
  const updated = await this.taskRepo.findOne({ where: { id } });
  await this.audit.record('UPDATE', 'Task', id, 'system');
  return updated;
  }

  async deleteTask(id: string) {
  await this.taskRepo.delete(id);
  await this.audit.record('DELETE', 'Task', id, 'system');
  return { message: 'Task deleted successfully' };
  }
}
