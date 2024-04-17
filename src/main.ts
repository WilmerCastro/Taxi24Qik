import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.API_PORT || 3000;
    const config = new DocumentBuilder()
        .setTitle('Taxi 24 API')
        .setDescription(
            `Taxi 24 is a platform for connecting passengers with nearby drivers for transportation services.
            This API provides endpoints for managing drivers, passengers, and trips.
            `,
        )
        .setVersion('1.0')
        .addServer('http://localhost:3000/api', 'Local environment')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('modules/docs', app, document);

    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({ transform: true, whitelist: true }),
    );
    app.setGlobalPrefix('modules');

    await app.listen(port);
}

bootstrap();
