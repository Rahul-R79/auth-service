import { PrismaClient } from "../generated/prisma/client";
import { logger } from "./logger";

export const prisma = new PrismaClient();

export async function connectToDatabase() {
    try {
        await prisma.$connect();
        logger.info("Database connected");
    } catch (err) {
        logger.fatal({ error: err }, "Database connection failed");
        process.exit(1);
    }
}
