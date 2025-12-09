import { z } from "zod";
import { ValidationError } from "../errors";

export function validate<T>(schema: z.ZodSchema<T>, data: unknown): T {
    try {
        return schema.parse(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const fields: Record<string, string> = {};
            error.issues.forEach((err) => {
                const path = err.path.join(".");
                fields[path] = err.message;
            });

            throw new ValidationError("Validation failed", fields);
        }
        throw error;
    }
}