import "dotenv/config";
import { prisma, connectToDatabase } from "./infrastructure/config/prisma";
import { createServer } from "http";
import { connectNodeAdapter } from "@connectrpc/connect-node";
import { AuthService } from "../proto/auth/auth_connect";
import { logger } from "./infrastructure/config/logger";

// Infrastructure
import { PrismaUserRepository } from "./infrastructure/repositories/PrismaUserRepository";
import { PrismaRefreshTokenRepository } from "./infrastructure/repositories/PrismaRefreshTokenRepository";
import { BcryptPasswordService } from "./infrastructure/services/BcryptPasswordService";
import { JwtTokenService } from "./infrastructure/services/JwtTokenService";

// Use Cases
import { SignUpUseCase } from "./applications/usecases/SignUpUseCase";
import { SignInUseCase } from "./applications/usecases/SignInUseCase";
import { ValidateTokenUseCase } from "./applications/usecases/ValidateTokenUseCase";
import { RefreshTokenUseCase } from "./applications/usecases/RefreshTokenUseCase";
import { LogoutUseCase } from "./applications/usecases/UserLogoutUseCase";

// Presentation
import {
    AuthServiceHandler,
    setAuthHandler,
    authServiceHandler,
} from "./presentation/grpc/AuthServiceHandler";

async function main() {
    connectToDatabase();
    const userRepo = new PrismaUserRepository(prisma);
    const refreshTokenRepo = new PrismaRefreshTokenRepository(prisma);
    const passwordService = new BcryptPasswordService();
    const tokenService = new JwtTokenService(
        process.env.JWT_ACCESS_SECRET!,
        process.env.JWT_REFRESH_SECRET!
    );

    const signUpUseCase = new SignUpUseCase(
        userRepo,
        passwordService,
        tokenService
    );

    const signInUseCase = new SignInUseCase(
        userRepo,
        passwordService,
        tokenService,
        refreshTokenRepo
    );
    const validateTokenUseCase = new ValidateTokenUseCase(tokenService);

    const refreshTokenUseCase = new RefreshTokenUseCase(
        userRepo,
        tokenService,
        refreshTokenRepo
    );

    const logoutUseCase = new LogoutUseCase(refreshTokenRepo);

    const authHandler = new AuthServiceHandler(
        signUpUseCase,
        signInUseCase,
        validateTokenUseCase,
        refreshTokenUseCase,
        logoutUseCase
    );

    setAuthHandler(authHandler);

    const PORT = process.env.PORT;

    const handler = connectNodeAdapter({
        routes: (router) => {
            router.service(AuthService, authServiceHandler);
        },
    });

    const server = createServer(handler);

    server.listen(Number(PORT), () => {
        logger.info({ port: PORT }, "Server started");
    });

    process.on("SIGTERM", async () => {
        logger.info("Shutting down...");
        server.close();
        await prisma.$disconnect();
        process.exit(0);
    });

    process.on("SIGINT", async () => {
        logger.info("Shutting down...");
        server.close();
        await prisma.$disconnect();
        process.exit(0);
    });
}

main().catch((err) => {
    logger.fatal({ error: err }, "Startup failed");
    process.exit(1);
});
