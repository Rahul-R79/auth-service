import { PrismaClient } from "@prisma/client";
import { RefreshTokenRepository } from "../../domain/repositories/RefreshTokenRepository";
import { createHash } from "crypto";

export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
    constructor(private prisma: PrismaClient) {}

    private hashToken(token: string): string {
        return createHash("sha256").update(token).digest("hex");
    }

    async save(token: string, userId: string, expiresAt: Date): Promise<void> {
        const hashedToken = this.hashToken(token);
        await this.prisma.refreshToken.create({
            data: {
                token: hashedToken,
                userId,
                expiresAt,
            },
        });
    }

    async find(token: string) {
        const hashedToken = this.hashToken(token);
        return this.prisma.refreshToken.findUnique({
            where: { token: hashedToken },
        });
    }

    async delete(token: string): Promise<void> {
        const hashedToken = this.hashToken(token);
        await this.prisma.refreshToken.deleteMany({
            where: { token: hashedToken },
        });
    }
}