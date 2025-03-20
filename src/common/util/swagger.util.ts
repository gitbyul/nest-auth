import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

/**
 * ref : https://www.npmjs.com/package/@nestjs/swagger
 * @param app
 */
export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('NestJS API description')
    .setVersion('0.0.1')
    .addBearerAuth(
      {
        type: 'http',
        name: 'JWT',
        scheme: 'bearer',
        in: 'header',
      },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
}
