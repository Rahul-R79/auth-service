import { TokenServiceRepository } from "../../domain/repositories/TokenServiceRepository";
import { validateTokenSchema } from "../../domain/validation";
import { validate } from "../../domain/validation";

interface ValidateTokenRequest {
    token: string;
}

interface ValidateTokenResponse {
    valid: boolean;
    userId?: string;
}

export class ValidateTokenUseCase {
    constructor(private tokenService: TokenServiceRepository) {}

    async execute(data: ValidateTokenRequest): Promise<ValidateTokenResponse> {
        const validatedData = validate(validateTokenSchema, data);
        const { token } = validatedData;

        try {
            const decoded = this.tokenService.verifyAccessToken(token);

            const userId =
                typeof decoded === "object" && "userId" in decoded
                    ? decoded.userId
                    : undefined;

            return {
                valid: true,
                userId,
            };
        } catch (err) {
            return {
                valid: false,
            };
        }
    }
}
