import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule, {cors: true});
  const config = new DocumentBuilder()
    .setTitle('Api-Starter')
    .setDescription('Ap starter API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('api-starter')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log("Works on: ", PORT);
  });
}
start();
