import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("api");

    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://management-server:3000'

        ],
        credentials: true,
    });

    await app.listen(3001, '0.0.0.0');
    console.log(`Simulation server is running on port 3001`);
}
bootstrap();