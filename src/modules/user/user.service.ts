import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities';
import { Task } from '@modules';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel: typeof User){}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userModel.create(createUserDto)
    return newUser
  }

  async findAll():Promise<User[]> {
    return await this.userModel.findAll({include: Task}) ;
  }

  async findOne(email: string) {
    return await this.userModel.findOne({where: {email: email},include: Task});
  }

  async findUserById(id: number):Promise<User> {
    return await this.userModel.findByPk(id)
  }


  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
