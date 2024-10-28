import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from 'winston.logger';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [WinstonModule.forRoot(winstonLoggerConfig), UserModule, AuthModule,],
})
export class AppModule {}
