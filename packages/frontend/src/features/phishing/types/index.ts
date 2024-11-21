export enum PhishingStatus {
  SENT = "SENT",
  CLICKED = "CLICKED",
}

export interface CreatePhishingAttemptDto {
  targetEmail: string;
  subject: string;
}

export interface PhishingAttempt {
  id: string;
  targetEmail: string;
  subject: string;
  status: PhishingStatus;
  createdAt: string;
  sentAt?: string;
  errorMessage?: string;
}

export interface BaseResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
