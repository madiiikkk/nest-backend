import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './pipes/validation.pipe.js';

async function bootstrap() {
	const PORT = process.env.PORT || 5000;

	const app = await NestFactory.create(AppModule, {
		instrument: ObserveInstrument
	});

	const config = new DocumentBuilder()
		.setTitle('Madi backend trainings')
		.setDescription('Documentation REST API')
		.setVersion('1.0.0')
		.addTag('MadiBD')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/api/docs', app, document);

	app.useGlobalPipes(new ValidationPipe());

	await app.listen(PORT, () =>
		console.log(`Server started on port = ${PORT}`)
	);
}
await bootstrap();
