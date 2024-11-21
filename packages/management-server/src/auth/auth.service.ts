import { Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcryptjs from "bcryptjs";
import { User, UserDocument } from "../users/schemas/user.schema";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { BaseResponse } from "../common/interfaces/response.interface";
import { CustomException } from "../common/exceptions/custom.exception";
import { APP_CONSTANTS } from "../common/constants";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async register(
    registerDto: RegisterDto
  ): Promise<BaseResponse<{ access_token: string }>> {
    try {
      const { email, password } = registerDto;

      const existingUser = await this.userModel.findOne({ email });
      if (existingUser) {
        throw new CustomException("User with this email already exists");
      }

      const salt = await bcryptjs.genSalt(APP_CONSTANTS.SALT_ROUNDS);
      const hashedPassword = await bcryptjs.hash(password, salt);

      const newUser = await this.userModel.create({
        ...registerDto,
        password: hashedPassword,
      });

      const payload = { sub: newUser._id, email: newUser.email };
      const access_token = this.jwtService.sign(payload);

      this.logger.log(`User registered successfully: ${email}`);

      return {
        success: true,
        data: { access_token },
      };
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  async login(
    loginDto: LoginDto
  ): Promise<BaseResponse<{ access_token: string }>> {
    try {
      const { email, password } = loginDto;

      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new CustomException("Invalid credentials");
      }

      const isPasswordValid = await bcryptjs.compare(password, user.password);
      if (!isPasswordValid) {
        throw new CustomException("Invalid credentials");
      }

      const payload = { sub: user._id, email: user.email };
      const access_token = this.jwtService.sign(payload);

      this.logger.log(`User logged in successfully: ${email}`);

      return {
        success: true,
        data: { access_token },
      };
    } catch (error) {
      this.logger.error(`Login failed: ${error.message}`);
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
