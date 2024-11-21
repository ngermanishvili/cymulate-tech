import {
  Injectable,
  Logger,
  NotFoundException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EmailService } from "../email/email.service";
import {
  PhishingAttempt,
  PhishingAttemptDocument,
  PhishingStatus,
} from "./schemas/phishing-attempt.schema";
import { CreatePhishingDto } from "./dto/create-phishing.dto";
import { PhishingResponseDto } from "./dto/phishing-response.dto";
import { PHISHING_CONSTANTS } from "../common/constants/phishing.constants";

@Injectable()
export class PhishingService {
  private readonly logger = new Logger(PhishingService.name);

  constructor(
    @InjectModel(PhishingAttempt.name)
    private phishingModel: Model<PhishingAttemptDocument>,
    private emailService: EmailService
  ) { }

  async create(
    createPhishingDto: CreatePhishingDto,
    userId: string
  ): Promise<PhishingResponseDto> {
    try {
      await this.checkRateLimit(userId);

      const newAttempt = await this.phishingModel.create({
        ...createPhishingDto,
        createdBy: userId,
        status: PhishingStatus.SENT,
      });

      await this.emailService.sendPhishingEmail(
        createPhishingDto.targetEmail,
        createPhishingDto.subject,
        newAttempt._id.toString()
      );

      newAttempt.status = PhishingStatus.SENT;
      newAttempt.sentAt = new Date();

      await newAttempt.save();
      return this.mapToDto(newAttempt);
    } catch (error) {
      this.logger.error(`Failed to create phishing attempt: ${error.message}`);
      throw error;
    }
  }

  private async checkRateLimit(userId: string): Promise<void> {
    const windowStart = new Date(
      Date.now() - PHISHING_CONSTANTS.RATE_LIMIT_WINDOW
    );

    const attemptsInWindow = await this.phishingModel.countDocuments({
      createdBy: userId,
      createdAt: { $gte: windowStart },
    });

    if (attemptsInWindow >= PHISHING_CONSTANTS.MAX_ATTEMPTS_PER_WINDOW) {
      throw new HttpException(
        `Rate limit exceeded. Maximum ${PHISHING_CONSTANTS.MAX_ATTEMPTS_PER_WINDOW} attempts allowed per ${PHISHING_CONSTANTS.RATE_LIMIT_WINDOW / 3600000} hour(s)`,
        HttpStatus.TOO_MANY_REQUESTS
      );
    }
  }
  async findAll(userId: string): Promise<PhishingResponseDto[]> {
    const attempts = await this.phishingModel
      .find({ createdBy: userId })
      .sort({ createdAt: -1 })
      .exec();

    return attempts.map((attempt) => this.mapToDto(attempt));
  }

  async findOne(id: string, userId: string): Promise<PhishingResponseDto> {
    const attempt = await this.phishingModel
      .findOne({ _id: id, createdBy: userId })
      .exec();

    if (!attempt) {
      throw new NotFoundException(`Phishing attempt with ID ${id} not found`);
    }

    return this.mapToDto(attempt);
  }

  async trackClick(id: string): Promise<void> {
    try {
      const attempt = await this.phishingModel
        .findByIdAndUpdate(
          id,
          {
            $set: {
              status: PhishingStatus.CLICKED,
            },
          },
          { new: true }
        )
        .exec();

      if (!attempt) {
        throw new NotFoundException(`Phishing attempt with ID ${id} not found`);
      }
    } catch (error) {
      this.logger.error(`Failed to track click: ${error.message}`);
      throw error;
    }
  }

  private mapToDto(attempt: PhishingAttemptDocument): PhishingResponseDto {
    const attemptObj = attempt.toObject();
    return {
      id: attemptObj.id,
      targetEmail: attemptObj.targetEmail,
      subject: attemptObj.subject,
      status: attemptObj.status,
      createdAt: attemptObj.createdAt,
      sentAt: attemptObj.sentAt,
      errorMessage: attemptObj.errorMessage,
    };
  }
}
