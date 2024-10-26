import { morganOption } from '../winston.logger';
import { NestFactory } from '@nestjs/core';
import { config } from 'convict.config';
import { AppModule } from './app.module';
import morgan from 'morgan';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  
  const format = `\n\b:remote-addr - ':method :url HTTP/:http-version' :status :response-time ms - :res[content-length] ":referrer" ":user-agent"\n` + '\n\b';
  app.use(morgan(format, morganOption));

  await app.listen(config.get('port'));
}
bootstrap();
