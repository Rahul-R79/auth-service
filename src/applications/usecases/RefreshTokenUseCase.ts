import { UserRepository } from "../../domain/repositories/UserRepository";
import { TokenServiceRepository } from "../../domain/repositories/TokenServiceRepository";
import { RefreshTokenRepository } from "../../domain/repositories/RefreshTokenRepository";
import { TokenExpiredError, InvalidTokenPayloadError, UserNotFoundError } from "../../domain/errors";
import { refreshTokenSchema } from "../../domain/validation";
import { validate } from "../../domain/validation";

interface RefreshTokenRequest {
    refreshToken: string;
}

interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

export class RefreshTokenUseCase {
    constructor(
        private userRepository: UserRepository,
        private tokenService: TokenServiceRepository,
        private refreshTokenRepository: RefreshTokenRepository
    ) {}

    async execute(data: RefreshTokenRequest): Promise<RefreshTokenResponse> {
        const validatedData = validate(refreshTokenSchema, data);
        const { refreshToken } = validatedData;

        let decoded: any;
        try {
            decoded = this.tokenService.verifyRefreshToken(refreshToken);
        } catch (err) {
            throw new TokenExpiredError("refresh");
        }

        const storedToken = await this.refreshTokenRepository.find(refreshToken);
        if (!storedToken) {
            throw new TokenExpiredError("refresh");
        }

        const userId =
            typeof decoded === "object" && "userId" in decoded
                ? decoded.userId
                : undefined;

        if (!userId) {
            throw new InvalidTokenPayloadError("missing userId");
        }

        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new UserNotFoundError(userId);
        }

        await this.refreshTokenRepository.delete(refreshToken);

        const tokens = this.tokenService.generateTokens({
            userId: user.id,
            email: user.email,
        });

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.refreshTokenRepository.save(
            tokens.refreshToken,
            user.id,
            expiresAt
        );

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }
}
