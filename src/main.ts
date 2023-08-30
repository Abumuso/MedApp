import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

const start = async () => {
  try {
    const config = new DocumentBuilder()
      .setTitle('medApp')
      .setDescription('Mini project for delivery medical products')
      .setVersion('1.0.0')
      .addTag('NodeJs, NestJS, PostgreSQL, Sequielize, JWT, Swagger, Docker')
      .build();

    const PORT = process.env.PORT || 3333;
    const app = await NestFactory.create(AppModule);
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
    app.use(cookieParser());
    // app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
