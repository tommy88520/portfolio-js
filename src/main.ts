import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  const config = new DocumentBuilder()
    .setTitle('Portfolio')
    .setDescription("Tommy's portfolio API description")
    .setVersion('1.0')
    .addTag('Portfolio')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);

  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
    methods: '*',
    credentials: true,
  });
  await app.listen(port, () => {
    console.log(new Date().toLocaleString());
    console.log(`App running on port ${port}...😊 `);
  });
}
bootstrap();
