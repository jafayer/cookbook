import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { join } from 'node:path';
import { NotFoundExceptionFilter } from './utils/filters';
import { SessionInterceptor } from './utils/SessionInterceptor';
import * as nunjucks from 'nunjucks';
import * as cookieParser from "cookie-parser";
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('html');

  nunjucks.configure(join(__dirname, '..', 'views'), {
    autoescape: true,
    express: app,
    dev: true,
    watch: true,
  });

  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.use(cookieParser());
  app.useGlobalInterceptors(new SessionInterceptor(app.get(ConfigService)));

  const config = new DocumentBuilder()
    .setTitle('Cooklang API')
    .setDescription('The Cooklang API description')
    .setVersion('1.0')
    .addBasicAuth()
    .build();


  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
