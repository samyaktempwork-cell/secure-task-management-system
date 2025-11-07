import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from '../auth/auth.module';
import { TaskModule } from './tasks/task.module';
import { AuditLogService } from './audit-log.service';
import { AuditLogController } from './audit-log.controller';
import { AuditLog } from '../entities/audit-log.entity';
import { Organization } from '../entities/organization.entity';
import { User } from '../entities/user.entity';
import { Task } from '../entities/task.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './data/db.sqlite',
      entities: [User, Task, AuditLog, Organization],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([AuditLog]),
    AuthModule,
    TaskModule,
  ],
  controllers: [AppController, AuditLogController],
  providers: [AuditLogService],
})
export class AppModule {}
