export interface TokenServiceRepository {
    generateTokens(payload: any): {
        accessToken: string;
        refreshToken: string;
    };

    verifyAccessToken(token: string): any;
    verifyRefreshToken(token: string): any;
}
