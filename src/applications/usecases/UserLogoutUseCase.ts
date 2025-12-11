import { RefreshTokenRepository } from "../../domain/repositories/RefreshTokenRepository";

interface LogoutRequest {
    refreshToken: string;
}

interface LogoutResponse {
    success: boolean;
}

export class LogoutUseCase {
    constructor(private refreshTokenRepository: RefreshTokenRepository) {}

    async execute(req: LogoutRequest): Promise<LogoutResponse> {
        await this.refreshTokenRepository.delete(req.refreshToken);
        return { success: true };
    }
}