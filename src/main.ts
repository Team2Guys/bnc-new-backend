import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://185.151.51.28:5001',
        'http://localhost:5001',
        'http://185.151.51.28:5004',
        'https://blindsandcurtains.ae',
        'https://www.blindsandcurtains.ae',
        'https://avenue39.com',
        'https://www.avenue39.com',
        'https://bncprod.vercel.app',
        'https://ppc.blindsandcurtains.ae/',
        'https://ppc.blindsandcurtains.ae',
        'https://bnc-new-frontend.vercel.app',
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  });

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.setGlobalPrefix('backend/api');
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

  const config = new DocumentBuilder()
    .setTitle('Blind and curtains')
    .setDescription('Docs for blind and curtains')
    .setVersion('1.0')
    .addTag('BNC')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.port || 5002, () =>
    console.log(`http://localhost:${process.env.port || 5002}/backend/api`),
  );
}
bootstrap();
