import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";

export const prisma = new PrismaClient();

const MAX_RETRIES = 5;
const RETRY_DELAY = 5000; // 5 seconds

export async function connectToDatabase() {
    let retries = 0;
    while (retries < MAX_RETRIES) {
        try {
            await prisma.$connect();
            logger.info("Database connected successfully");
            return;
        } catch (err) {
            retries++;
            logger.error({ error: err, attempt: retries }, "Database connection failed, retrying...");
            if (retries >= MAX_RETRIES) {
                logger.fatal("Could not connect to database after maximum retries");
                process.exit(1);
            }
            await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
        }
    }
}
