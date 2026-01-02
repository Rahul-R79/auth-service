import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";

export const prisma = new PrismaClient();

export async function connectToDatabase() {
    try {
        const url = process.env.MONGODB_ATLAS_URL;
        console.log(`[DEBUG] Attempting to connect to MongoDB... (URL defined: ${!!url})`);
        await prisma.$connect();
        logger.info("Database connected successfully");
        console.log(`[DEBUG] MongoDB Connection Established`);
    } catch (err) {
        console.error(`[DEBUG] Database Connection ERROR:`, err);
        logger.fatal({ error: err }, "Database connection failed");
        process.exit(1);
    }
}
