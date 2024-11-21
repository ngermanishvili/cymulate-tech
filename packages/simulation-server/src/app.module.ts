import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from './email/email.module';
import { SimulationModule } from './simulation/simulation.module';
import configuration from './config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
        }),
        MongooseModule.forRoot('mongodb+srv://nsamkharadze8888:Rc65czGYoDXCWX78@cluster0.tgsbd.mongodb.net/phishing-management'),

        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('database.uri'),
            }),
            inject: [ConfigService],
        }),
        EmailModule,
        SimulationModule,
    ],
})
export class AppModule { }