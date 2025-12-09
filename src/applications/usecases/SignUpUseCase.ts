import { UserRepository } from "../../domain/repositories/UserRepository";
import { PasswordHashRepository } from "../../domain/repositories/PasswordHashRepository";
import { TokenServiceRepository } from "../../domain/repositories/TokenServiceRepository";
import { UserAlreadyExistsError } from "../../domain/errors";
import { signUpSchema } from "../../domain/validation";
import { validate } from "../../domain/validation";

interface signUpRequest {
    email: string;
    password: string;
    displayName: string;
}

interface signUpResponse {
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

export class SignUpUseCase {
    constructor(
        private userRepository: UserRepository,
        private passwordHashRepository: PasswordHashRepository,
        private tokenServiceRepository: TokenServiceRepository
    ){};

    async execute(data: signUpRequest): Promise<signUpResponse>{
        const validatedData = validate(signUpSchema, data);
        const { email, password, displayName } = validatedData;

        const existingUser = await this.userRepository.findByEmail(email);

        if(existingUser){
            throw new UserAlreadyExistsError(email);
        }

        const hashedPassword = await this.passwordHashRepository.hash(password);

        const user = await this.userRepository.create({
            email, 
            password: hashedPassword,
            name: displayName
        })

        const {accessToken, refreshToken} = this.tokenServiceRepository.generateTokens({
            userId: user.id,
            email: user.email
        })

        return {
            user:{
                id: user.id,
                email: user.email,
                displayName: user.name
            },
            tokens:{
                accessToken, 
                refreshToken
            }
        }
    }
}
