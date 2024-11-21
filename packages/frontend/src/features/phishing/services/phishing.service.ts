import { BaseResponse } from "../types";
import { ApiClient, apiClient } from "@/core/api/client";
import { CreatePhishingAttemptDto, PhishingAttempt } from "../types";

export class PhishingService {
  private readonly baseUrl = "/phishing";

  private constructor(private apiClient: ApiClient) {}

  public static getInstance(apiClient: ApiClient): PhishingService {
    return new PhishingService(apiClient);
  }

  async createAttempt(
    data: CreatePhishingAttemptDto
  ): Promise<BaseResponse<PhishingAttempt>> {
    const response = await this.apiClient.post<BaseResponse<PhishingAttempt>>(
      `${this.baseUrl}/send`,
      data
    );
    return response.data;
  }

  async getAttempts(): Promise<BaseResponse<PhishingAttempt[]>> {
    const response = await this.apiClient.get<BaseResponse<PhishingAttempt[]>>(
      this.baseUrl
    );
    return response.data;
  }

  async getAttempt(id: string): Promise<BaseResponse<PhishingAttempt>> {
    const response = await this.apiClient.get<BaseResponse<PhishingAttempt>>(
      `${this.baseUrl}/${id}`
    );
    return response.data;
  }
}


export const phishingService = PhishingService.getInstance(apiClient);
