import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities';


@ApiTags("users")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Post("/add")
  create(@Body() createUserDto: CreateUserDto):Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll():Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Body() email: string) {
    return this.userService.findOne(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Patch(':id')
  findUserById(@Param('id') id: number):Promise<User> {
    return this.userService.findUserById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
