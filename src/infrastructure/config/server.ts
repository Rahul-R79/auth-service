import { createServer, RequestListener } from "http";
import { logger } from "./logger";

export interface ServerConfig {
    port: number;
    serviceName: string;
    onShutdown?: () => Promise<void>;
}

export const startGrpcServer = (handler: RequestListener, config: ServerConfig) => {
    const { port, serviceName, onShutdown } = config;
    const server = createServer(handler);

    server.listen(port, "0.0.0.0", () => {
        logger.info({ port }, `${serviceName} started`);
    });

    // Render/AWS Load Balancer Keep-Alive fix
    // Prevents 502 Bad Gateway errors caused by LB timeouts (60s) exceeding Node defaults (5s)
    server.keepAliveTimeout = 65000; // 65 seconds
    server.headersTimeout = 66000;   // 66 seconds

    const gracefulShutdown = async () => {
        logger.info("Received kill signal, shutting down gracefully");

        server.close(async () => {
            logger.info("Closed out remaining connections");
            try {
                if (onShutdown) {
                    await onShutdown();
                }
                process.exit(0);
            } catch (err) {
                logger.error({ err }, "Error during shutdown cleanup");
                process.exit(1);
            }
        });

        // Force close after 10s
        setTimeout(() => {
            logger.error("Could not close connections in time, forcefully shutting down");
            process.exit(1);
        }, 10000);
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);

    return server;
};
