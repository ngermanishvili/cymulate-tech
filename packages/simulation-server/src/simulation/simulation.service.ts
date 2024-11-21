import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { SendPhishingEmailDto } from './dto/send-phishing-email.dto';

@Injectable()
export class SimulationService {
    private readonly logger = new Logger(SimulationService.name);

    constructor(private readonly emailService: EmailService) { }

    async sendPhishingEmail(dto: SendPhishingEmailDto) {
        return this.emailService.sendPhishingEmail(
            dto.targetEmail,
            dto.subject,
            dto.attemptId,
        );
    }
}