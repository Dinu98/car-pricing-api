import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      //This is making sure that any additional properties
      //Are stripped of the request before reaching controller handler
      whitelist: true
    })
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
