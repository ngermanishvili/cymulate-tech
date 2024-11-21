import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SendPhishingEmailDto {
    @IsEmail()
    @IsNotEmpty()
    targetEmail: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    subject: string;

    @IsString()
    @IsNotEmpty()
    attemptId: string;
}