import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Res,
  Logger,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { PhishingService } from "./phishing.service";
import { CreatePhishingDto } from "./dto/create-phishing.dto";
import { BaseResponse } from "../common/interfaces/response.interface";
import { PhishingValidationPipe } from "./pipes/phishing-validation.pipe";
import { ErrorTemplate } from "../common/templates/error.template";
import { PhishingResponseDto } from "./dto/phishing-response.dto";
import { UserDocument } from "../users/schemas/user.schema";

interface RequestWithUser extends Request {
  user: UserDocument;
}

@Controller("phishing")
export class PhishingController {
  private readonly logger = new Logger(PhishingController.name);

  constructor(private readonly phishingService: PhishingService) {
    // Log available routes
    this.logger.log("Initializing PhishingController with routes:");
    this.logger.log("GET /phishing/track/:id");
    this.logger.log("GET /phishing/:id");
    this.logger.log("POST /phishing/send");
  }
  @Get("track/:id")
  async trackClick(
    @Param("id") id: string,
    @Res() res: Response
  ): Promise<void> {
    this.logger.log(`Starting trackClick for ID: ${id}`);

    try {
      this.logger.log(`Received tracking request for ID: ${id}`);
      await this.phishingService.trackClick(id);
      this.logger.log(`Successfully tracked click for ID: ${id}`);

      this.logger.log("Sending response...");
      res.status(HttpStatus.OK).send(ErrorTemplate.getNotFoundPage());
      this.logger.log("Response sent");
    } catch (error) {
      this.logger.error(`Failed to track click: ${error.message}`);
      this.logger.error(`Stack trace: ${error.stack}`);
      res.status(HttpStatus.NOT_FOUND).send(ErrorTemplate.getErrorPage());
    }
  }

  @Post("send")
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe(), PhishingValidationPipe)
  async create(
    @Body() createPhishingDto: CreatePhishingDto,
    @Req() req
  ): Promise<BaseResponse<PhishingResponseDto>> {
    try {
      console.log("Received DTO:", createPhishingDto);
      console.log("User from request:", req.user);

      this.logger.log(`Creating phishing attempt for user: ${req.user._id}`);
      const result = await this.phishingService.create(
        createPhishingDto,
        req.user._id
      );
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      this.logger.error(`Failed to create phishing attempt: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req): Promise<BaseResponse<PhishingResponseDto[]>> {
    try {
      this.logger.log(
        `Fetching all phishing attempts for user: ${req.user._id}`
      );
      const attempts = await this.phishingService.findAll(req.user._id); 
      return {
        success: true,
        data: attempts,
      };
    } catch (error) {
      this.logger.error(`Failed to fetch phishing attempts: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Param("id") id: string,
    @Req() req
  ): Promise<BaseResponse<PhishingResponseDto>> {
    try {
      this.logger.log(
        `Fetching phishing attempt: ${id} for user: ${req.user._id}`
      );
      const attempt = await this.phishingService.findOne(id, req.user._id);
      return {
        success: true,
        data: attempt,
      };
    } catch (error) {
      this.logger.error(`Failed to fetch phishing attempt: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
