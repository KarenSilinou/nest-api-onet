import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repositories';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository, UserService]
})
export class UserModule {}
