import { NestFactory } from '@nestjs/core';
import { config } from 'convict.config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.get('port'));
}
bootstrap();
