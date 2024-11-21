import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {


    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>("email.host"),
      port: this.configService.get<number>("email.port"),
      secure: false,
      auth: {
        user: this.configService.get<string>("email.user"),
        pass: this.configService.get<string>("email.pass"),
      },
      debug: true, // დებაგ ინფორმაციისთვის
      logger: true, // დეტალური ლოგებისთვის
    });
  }

  async sendPhishingEmail(to: string, subject: string, attemptId: string) {
    const backendUrl = this.configService.get<string>("BACKEND_URL") || "http://localhost:3000";
    const trackingUrl = `${backendUrl}/api/phishing/track/${attemptId}`;

    try {
      // შევამოწმოთ კონექშენი გაგზავნამდე
      await this.verifyConnection();

      const info = await this.transporter.sendMail({
        from: `"Security Team" <${this.configService.get<string>("email.user")}>`,
        to,
        subject,
        html: this.getEmailTemplate(trackingUrl),
      });

      return {
        success: true,
        messageId: info.messageId,
        trackingUrl,
      };
    } catch (error) {

      throw new Error("Failed to send email");
    }
  }

  private getEmailTemplate(trackingUrl: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Important Security Update Required</h2>
        <p>Dear User,</p>
        <p>We've detected unusual activity in your account. Please verify your identity by clicking the link below:</p>
        <a href="${trackingUrl}" 
           style="display: inline-block; padding: 10px 20px; background-color: #007bff; 
                  color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;">
          Verify Account
        </a>
        <p style="color: #666;">If you didn't request this verification, please ignore this email.</p>
        <p style="color: #666;">Best regards,<br>Security Team</p>
      </div>
    `;
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      throw error;
    }
  }
}