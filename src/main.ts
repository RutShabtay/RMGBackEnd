import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(express.json());

  app.enableCors({
    origin: `http://localhost:${process.env.PORT || 3000}`,
    methods: ['POST', 'GET'],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3000);
  console.log(`🚀 Server is running on http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();
