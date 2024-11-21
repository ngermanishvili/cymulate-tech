import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    Matches
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePhishingDto {
    @IsEmail({}, { message: 'Please provide a valid email address' })
    @IsNotEmpty({ message: 'Email address is required' })
    @Transform(({ value }) => value?.toLowerCase().trim())
    targetEmail: string;

    @IsString({ message: 'Subject must be a string' })
    @IsNotEmpty({ message: 'Subject is required' })
    @MinLength(5, { message: 'Subject must be at least 5 characters long' })
    @MaxLength(100, { message: 'Subject cannot be longer than 100 characters' })
    @Transform(({ value }) => value?.trim())
    subject: string;
}
