import { Code } from "@connectrpc/connect";

export abstract class ApplicationError extends Error{
    public readonly code: Code;
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(
        message: string,
        code: Code = Code.Unknown,
        statusCode: number = 500,
        isOperational: boolean = true
    ){
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.code = code;
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}