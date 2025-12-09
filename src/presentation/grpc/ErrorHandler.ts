import { ConnectError, Code } from "@connectrpc/connect";
import { ApplicationError } from "../../domain/errors";
import { logger } from "../../infrastructure/config/logger";

export function handleError(error: unknown): ConnectError {
    if (error instanceof ConnectError) {
        return error;
    }

    if (error instanceof ApplicationError) {
        return new ConnectError(
            error.message,
            error.code,
            undefined,
            undefined,
            error
        );
    }

    if (error instanceof Error) {
        logger.error(
            {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
            "Unexpected error"
        );
        return new ConnectError(
            "An unexpected error occurred",
            Code.Internal,
            undefined,
            undefined,
            error
        );
    }

    logger.error({ error }, "Unknown error");
    return new ConnectError("An unknown error occurred", Code.Unknown);
}

export function withErrorHandler<TRequest, TResponse>(
    handler: (req: TRequest) => Promise<TResponse>
): (req: TRequest) => Promise<TResponse> {
    return async (req: TRequest): Promise<TResponse> => {
        try {
            return await handler(req);
        } catch (error) {
            throw handleError(error);
        }
    };
}
