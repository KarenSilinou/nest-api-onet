import { HttpCode, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories';
import * as bcrypt from 'bcrypt';
import { convertParams, extractPaginationData, extractProjectionData, extractSortingData, response } from '@nest-api-onet/helpers';
import { User } from './entities';

@Injectable()
export class UserService {

  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<string> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    createUserDto['date'] = { created: new Date().valueOf() };

    const result = await this.userRepository.createUser(createUserDto);
    return `User created with id: ${result.insertedId}`;
  }

  findAll(query: QueryOptions) {
    query = extractPaginationData(query);
    query = extractSortingData(query);
    query = extractProjectionData(query);
    query = convertParams(query);

    return this.userRepository.getUsers(query);
  }

  async findOne(id: string) {
    const user = await this.userRepository.getUserById(id);

    if (!user) throw new NotFoundException(`No user found with id ${id}`);

    user._id = user._id.toString();

    return new User(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if ('password' in updateUserDto) updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);

    const updateResult = await this.userRepository.updateUser(id, updateUserDto);

    if(updateResult.acknowledged && updateResult.matchedCount == 0) throw new NotFoundException();

    return response(HttpStatus.OK, "User edit successfully");
  }

  async remove(id: string) {
    const deleteResult = await this.userRepository.deleteUser(id);

    if (deleteResult.acknowledged && deleteResult.deletedCount > 0) {
      return response(HttpStatus.OK, "User delete successfully");
    }
  }
}
