import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, taskStatus } from './entities/task.entity';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserService } from '@modules';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task) private taskModel: typeof Task,
    // private userService: UserService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    // const findUser = await this.userModel.findByPk(createTaskDto.user_id);
    // if (!findUser) {
    //   throw new NotFoundException('User not found');
    // }
    return this.taskModel.create(createTaskDto);
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.findAll();
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskModel.findByPk(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findByPk(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    if (updateTaskDto.taskStatus !== taskStatus.done && updateTaskDto.taskStatus !== taskStatus.pending) {
      throw new BadRequestException("task status is error")
  }
  
    return this.taskModel.update({
      data: updateTaskDto.data,
      status: updateTaskDto.taskStatus
    }, { where: { id } });
  }

  async remove(id: number) {
    return this.taskModel.destroy({ where: { id } });
  }
}
