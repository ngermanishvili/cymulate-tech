import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { EmailModule } from "./email/email.module";
import { AppController } from "./app.controller";
import configuration from "./config/configuration";
import { PhishingModule } from "./phishing/phishing.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("database.uri"),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    PhishingModule,
    EmailModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
