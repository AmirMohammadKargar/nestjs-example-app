import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function swaggerSetup(app) {
  const config = new DocumentBuilder()
    .setTitle('NestJs Idea Documentation')
    .setDescription('NestJs example app')
    .setVersion('1.0')
    .addServer('localhost:4000')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger-doc', app, document);
}

export default swaggerSetup;
