import { NestFactory } from '@nestjs/core';
import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({});
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const extra: Record<string, string[]> = {};
        errors.forEach((err) => {
          extra[err.property] = Object.values(err.constraints);
        });
        return new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Bad Request',
          extra,
        });
      },
    }),
  );
  await app.listen(process.env.PORT || 3001);
}

bootstrap();
