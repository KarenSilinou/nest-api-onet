import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<string> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    createUserDto['date'] = { created: new Date().valueOf() };

    const result = await this.userRepository.createUser(createUserDto);
    return `User created with id: ${result.insertedId}`;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
