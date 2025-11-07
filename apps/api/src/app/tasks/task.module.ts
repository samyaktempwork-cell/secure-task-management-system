import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../../entities/task.entity';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { AuditLog } from '../../entities/audit-log.entity';
import { AuditLogService } from '../audit-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task, AuditLog])],
  controllers: [TaskController],
  providers: [TaskService, AuditLogService],
  exports: [TaskService],
})
export class TaskModule {}
