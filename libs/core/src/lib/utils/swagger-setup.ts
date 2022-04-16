import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export interface SwaggerSetupOptions {
  title: string;
  description: string;
  basePath?: string;
  version: string;
  bearerAuth?: boolean;
}
export const SwaggerSetup = (
  app: INestApplication,
  option: SwaggerSetupOptions
) => {
  const options = new DocumentBuilder()
    .setTitle(option.title)
    .setDescription(option.description)
    .setVersion(option.version);
  if (option.bearerAuth) {
    options.addBearerAuth();
  }
  const document = SwaggerModule.createDocument(app, options.build());
  SwaggerModule.setup('swagger', app, document);
};
