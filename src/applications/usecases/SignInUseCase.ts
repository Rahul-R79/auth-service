import { UserRepository } from "../../domain/repositories/UserRepository";
import { PasswordHashRepository } from "../../domain/repositories/PasswordHashRepository";
import { TokenServiceRepository } from "../../domain/repositories/TokenServiceRepository";
import { InvalidCredentialsError } from "../../domain/errors";
import { signInSchema } from "../../domain/validation";
import { validate } from "../../domain/validation";

interface SignInRequest {
    email: string;
    password: string;
}

interface SignInResponse {
    user: {
        id: string;
        email: string;
        displayName: string;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}

export class SignInUseCase {
    constructor(
        private userRepository: UserRepository,
        private passwordHashRepository: PasswordHashRepository,
        private tokenService: TokenServiceRepository
    ) {}

    async execute(data: SignInRequest): Promise<SignInResponse> {
        const validatedData = validate(signInSchema, data);
        const { email, password } = validatedData;

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new InvalidCredentialsError();
        }

        const isValid = await this.passwordHashRepository.compare(
            password,
            user.password
        );

        if (!isValid) {
            throw new InvalidCredentialsError();
        }

        const { accessToken, refreshToken } = this.tokenService.generateTokens({
            userId: user.id,
            email: user.email,
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                displayName: user.name,
            },
            tokens: {
                accessToken,
                refreshToken,
            },
        };
    }
}
