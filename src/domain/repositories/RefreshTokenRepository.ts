import { RefreshToken } from "@prisma/client";

export interface RefreshTokenRepository {
    save(token: string, userId: string, expiresAt: Date): Promise<void>;
    find(token: string): Promise<RefreshToken | null>;
    delete(token: string): Promise<void>;
}
