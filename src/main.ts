import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { Logger, VersioningType } from '@nestjs/common';
import swaggerSetup from './swagger/swagger-setup';
import * as helmet from 'helmet';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api');

  swaggerSetup(app);

  await app.listen(port);
  Logger.log(`Server running on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
