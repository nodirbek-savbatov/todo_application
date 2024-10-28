import { forwardRef, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './entities/task.entity';
import { UserService } from '../user';

@Module({
  imports: [SequelizeModule.forFeature([Task]),
],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
