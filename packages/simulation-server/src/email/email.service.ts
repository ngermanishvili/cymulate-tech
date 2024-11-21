import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>("email.host"),
      port: this.configService.get<number>("email.port"),
      secure: false,
      auth: {
        user: this.configService.get<string>("email.user"),
        pass: this.configService.get<string>("email.pass"),
      },
    });
  }

  async sendPhishingEmail(to: string, subject: string, attemptId: string) {
    const backendUrl =
      this.configService.get<string>("BACKEND_URL") || "http://localhost:3000";

    const trackingUrl = `${backendUrl}/api/phishing/track/${attemptId}`;

    const html = `
      <div>
        <h2>Important Security Update Required</h2>
        <p>Dear User,</p>
        <p>We've detected unusual activity in your account. Please verify your identity by clicking the link below:</p>
        <a href="${trackingUrl}" style="
          display: inline-block;
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 15px 0;
        ">Verify Account</a>
        <p>If you didn't request this verification, please ignore this email.</p>
        <p>Best regards,<br>Security Team</p>
      </div>
    `;

    try {
      const info = await this.transporter.sendMail({
        from: `"Security Team" <${this.configService.get<string>("email.user")}>`,
        to,
        subject,
        html,
      });

      return {
        success: true,
        messageId: info.messageId,
        trackingUrl,
      };
    } catch (error) {
      console.error("Email sending failed:", error);
      throw new Error("Failed to send email");
    }
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error("Email configuration error:", error);
      return false;
    }
  }
}
