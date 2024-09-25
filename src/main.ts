import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as https from 'https';

async function bootstrap() {
  // Carregar os certificados SSL
  const httpsOptions = {
    key: fs.readFileSync('/home/back/cert/server.key'),
    cert: fs.readFileSync('/home/back/cert/server.cert'),
  };

  // Criar a aplicação Nest com HTTPS
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Documentação com Swagger - Asgard')
    .setDescription(
      'O Swagger (aka OpenApi) é uma biblioteca muito conhecida no universo backend, estando disponível para diversas linguagens e frameworks. Ela gera um site interno no seu backend que descreve, com muitos detalhes, cada endpoint e estrutura de entidades presentes na sua aplicação.',
    )
    .setVersion('1.0')
    .addTag('users')
    .addTag('reserve')
    .addTag('room')
    .addTag('block')
    .addTag('instituition')
    .addTag('course')
    .addTag('class')
    .addTag('roles')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(443); // Porta 443 para HTTPS
}
bootstrap();
