import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PhishingController } from "./phishing.controller";
import { PhishingService } from "./phishing.service";
import {
  PhishingAttempt,
  PhishingAttemptSchema,
} from "./schemas/phishing-attempt.schema";
import { EmailModule } from "../email/email.module";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhishingAttempt.name, schema: PhishingAttemptSchema },
    ]),
    EmailModule,
  ],
  controllers: [PhishingController],
  providers: [PhishingService],
})
export class PhishingModule {}
