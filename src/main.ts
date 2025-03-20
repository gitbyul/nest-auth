import { NestFactory } from '@nestjs/core';
import { AppModule } from './domain/app/app.module';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { setupSwagger } from './common/util/swagger.util';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const port = process.env.PORT ?? 3000;
  const node = process.env.NODE_ENV;
  const db_host = process.env.DB_HOST;
  const db_port = process.env.DB_PORT;
  const redis_host = process.env.REDIS_HOST;
  const redis_port = process.env.REDIS_PORT;
  const httpsOptions = {
    key:
      process.env.NODE_ENV != 'local'
        ? fs.readFileSync('/root/node/pem/private-key.pem')
        : fs.readFileSync(path.join(process.cwd(), 'pem/private-key.pem')),
    cert:
      process.env.NODE_ENV != 'local'
        ? fs.readFileSync('/root/node/pem/cert.pem')
        : fs.readFileSync(path.join(process.cwd(), 'pem/cert.pem')),
    secureProtocol: 'TLSv1_2_method',
  };

  const app = await NestFactory.create(AppModule, { httpsOptions });
  setupSwagger(app);

  app.use(cookieParser());
  if (node === 'prod') {
    app.enableCors({
      allowedHeaders: 'Content-Type, Accept, Origin',
      methods: 'GET,PUT,POST,PATCH,DELETE,OPTIONS',
      credentials: true,
      origin: true,
      preflightContinue: false,
    });
  } else {
    app.enableCors();
  }

  await app.listen(port, () => {
    logger.verbose(`Application is running env: ${node}`);
    logger.verbose(`Application is running url: http://localhost:${port}`);
    logger.verbose(`Database is running host: ${db_host}:${db_port}`);
    logger.verbose(`Redis is running host: ${redis_host}:${redis_port}`);
  });
}
bootstrap();
