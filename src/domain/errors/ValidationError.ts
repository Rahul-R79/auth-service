import { Code } from "@connectrpc/connect";
import { ApplicationError } from "./ApplicationError";

export class ValidationError extends ApplicationError {
    public readonly fields?: Record<string, string>;

    constructor(message: string, fields?: Record<string, string>) {
        super(message, Code.InvalidArgument, 400);
        this.name = "ValidationError";
        this.fields = fields;
    }
}
