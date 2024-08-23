import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() userData: User): Promise<User> {
    return this.userService.create(userData);
  }
}
