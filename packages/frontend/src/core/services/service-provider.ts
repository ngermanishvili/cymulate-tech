import { ApiClient } from '@/core/api/client';
import { AuthService } from '@/features/auth/services/auth.service';
import { PhishingService, phishingService } from '@/features/phishing/services/phishing.service';

export class ServiceProvider {
    private static instance: ServiceProvider;
    private apiClient: ApiClient;
    private authService: AuthService | null = null;

    private constructor() {
        this.apiClient = ApiClient.getInstance();
    }

    public static getInstance(): ServiceProvider {
        if (!ServiceProvider.instance) {
            ServiceProvider.instance = new ServiceProvider();
        }
        return ServiceProvider.instance;
    }

    public getAuthService(): AuthService {
        if (!this.authService) {
            this.authService = new AuthService(this.apiClient);
        }
        return this.authService;
    }

    public getPhishingService(): PhishingService {
        return phishingService;
    }
}