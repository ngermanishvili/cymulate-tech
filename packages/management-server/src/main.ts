import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.enableCors({
    origin: [
      "http://localhost:5173",
      "http://frontend:5173",
      "http://localhost:5174",
      "http://frontend:5175",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Origin",
      "X-Requested-With",
    ],
  });

  await app.listen(3000, "0.0.0.0");
  console.log(`Management server is running on port 3000`);
}
bootstrap();
