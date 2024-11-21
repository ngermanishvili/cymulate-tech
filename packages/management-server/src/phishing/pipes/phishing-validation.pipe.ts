import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CreatePhishingDto } from '../dto/create-phishing.dto';

@Injectable()
export class PhishingValidationPipe implements PipeTransform {
    transform(value: CreatePhishingDto) {
        const blockedDomains = ['mail.ru', 'yandex.ru'];
        const emailDomain = value.targetEmail.split('@')[1];

        if (blockedDomains.includes(emailDomain)) {
            throw new BadRequestException(
                `Sending to ${emailDomain} addresses is not allowed`
            );
        }
        const spamWords = ['viagra', 'lottery', 'winner', 'bitcoin'];
        const hasSpamWords = spamWords.some(word =>
            value.subject.toLowerCase().includes(word)
        );

        if (hasSpamWords) {
            throw new BadRequestException(
                'Subject contains prohibited words'
            );
        }

        return value;
    }
}