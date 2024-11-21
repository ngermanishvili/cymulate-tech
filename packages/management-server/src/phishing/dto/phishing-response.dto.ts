import { PhishingStatus } from '../schemas/phishing-attempt.schema';

export interface PhishingResponseDto {
    id: string;
    targetEmail: string;
    subject: string;
    status: PhishingStatus;
    createdAt: Date;
    sentAt?: Date;
    errorMessage?: string;
}

export class PhishingResponse implements PhishingResponseDto {
    id: string;
    targetEmail: string;
    subject: string;
    status: PhishingStatus;
    createdAt: Date;
    sentAt?: Date;
    errorMessage?: string;
}