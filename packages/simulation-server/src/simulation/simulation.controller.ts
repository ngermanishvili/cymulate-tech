import { Controller, Post, Body, Logger } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { SendPhishingEmailDto } from './dto/send-phishing-email.dto';

interface BaseResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

@Controller('simulation')
export class SimulationController {
    private readonly logger = new Logger(SimulationController.name);

    constructor(private readonly simulationService: SimulationService) { }

    @Post('send')
    async sendPhishingEmail(
        @Body() dto: SendPhishingEmailDto,
    ): Promise<BaseResponse<{ messageId: string; trackingUrl: string }>> {
        try {
            const result = await this.simulationService.sendPhishingEmail(dto);
            return {
                success: true,
                data: result,
            };
        } catch (error) {
            this.logger.error(`Failed to send phishing email: ${error.message}`);
            return {
                success: false,
                error: error.message,
            };
        }
    }
}