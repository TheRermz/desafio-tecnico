import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const extractMessages = (errs: ValidationError[]): string[] =>
          errs.flatMap((err) =>
            err.children?.length
              ? extractMessages(err.children)
              : Object.values(err.constraints ?? {}),
          );
        return new BadRequestException(extractMessages(errors));
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
