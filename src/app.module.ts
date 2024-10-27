import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerConfig } from 'winston.logger';
import { UserModule } from './user/user.module';

@Module({
  imports: [WinstonModule.forRoot(winstonLoggerConfig), UserModule,],
})
export class AppModule {}
