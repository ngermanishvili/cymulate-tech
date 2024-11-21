import { Module } from '@nestjs/common';
import { EmailModule } from '../email/email.module';
import { SimulationController } from './simulation.controller';
import { SimulationService } from './simulation.service';

@Module({
    imports: [EmailModule],
    controllers: [SimulationController],
    providers: [SimulationService],
})
export class SimulationModule { }