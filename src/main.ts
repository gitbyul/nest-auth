import { NestFactory } from '@nestjs/core';
import { AppModule } from './domain/app/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const port = process.env.PORT ?? 3000;
  const node = process.env.NODE_ENV;
  const db_host = process.env.DB_HOST;
  await app.listen(port, () => {
    logger.verbose(`Application is running env: ${node}`);
    logger.verbose(`Application is running url: http://localhost:${port}`);
    logger.verbose(`Database is running host: ${db_host}`);
  });
}
bootstrap();
