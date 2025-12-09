import jwt from "jsonwebtoken";
import { TokenServiceRepository } from "../../domain/repositories/TokenServiceRepository";

export class JwtTokenService implements TokenServiceRepository {
    private readonly accessSecret: string;
    private readonly refreshSecret: string;
    private readonly accessExpiresIn = "15m";
    private readonly refreshExpiresIn = "7d";

    constructor(accessSecret: string, refreshSecret: string) {
        this.accessSecret = accessSecret;
        this.refreshSecret = refreshSecret;
    }

    generateTokens(payload: any): {
        accessToken: string;
        refreshToken: string;
    } {
        const accessToken = jwt.sign(payload, this.accessSecret, {
            expiresIn: this.accessExpiresIn,
        });
        const refreshToken = jwt.sign(payload, this.refreshSecret, {
            expiresIn: this.refreshExpiresIn,
        });
        return { accessToken, refreshToken };
    }

    verifyAccessToken(token: string): object | string {
        try {
            return jwt.verify(token, this.accessSecret);
        } catch (err) {
            throw new Error("Invalid or expired access token");
        }
    }

    verifyRefreshToken(token: string): object | string {
        try {
            return jwt.verify(token, this.refreshSecret);
        } catch (err) {
            throw new Error("Invalid or expired refresh token");
        }
    }
}
