import { Code } from "@connectrpc/connect";
import { ApplicationError } from "./ApplicationError";

export class UserAlreadyExistsError extends ApplicationError {
    constructor(email: string) {
        super(
            `User with email ${email} already exists`,
            Code.AlreadyExists,
            409
        );
        this.name = "UserAlreadyExistsError";
    }
}

export class InvalidCredentialsError extends ApplicationError {
    constructor(message: string = "Invalid email or password") {
        super(message, Code.Unauthenticated, 401);
        this.name = "InvalidCredentialsError";
    }
}

export class UserNotFoundError extends ApplicationError {
    constructor(identifier: string) {
        super(`User not found: ${identifier}`, Code.NotFound, 404);
        this.name = "UserNotFoundError";
    }
}

export class TokenExpiredError extends ApplicationError {
    constructor(tokenType: "access" | "refresh" = "access") {
        super(
            `${tokenType} token has expired or is invalid`,
            Code.Unauthenticated,
            401
        );
        this.name = "TokenExpiredError";
    }
}

export class InvalidTokenPayloadError extends ApplicationError {
    constructor(reason: string) {
        super(`Invalid token payload: ${reason}`, Code.InvalidArgument, 400);
        this.name = "InvalidTokenPayloadError";
    }
}
