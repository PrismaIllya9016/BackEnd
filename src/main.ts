import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  logger.debug('Variables de entorno:', {
    mongoUri: process.env.MONGODB_URI ? 'definida' : 'no definida',
    jwtSecret: process.env.JWT_SECRET ? 'definida' : 'no definida'
  });

  // Validar variables de entorno requeridas
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    logger.error('Faltan variables de entorno requeridas');
    if (!process.env.MONGODB_URI) logger.error('MONGODB_URI no está definida');
    if (!process.env.JWT_SECRET) logger.error('JWT_SECRET no está definida');
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('The products API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
