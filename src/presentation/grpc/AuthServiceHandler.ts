import {
    SignUpRequest,
    SignInRequest,
    ValidateTokenRequest,
    AuthResponse,
    RefreshTokenRequest,
    ValidateTokenResponse,
} from "../../../proto/auth/auth_pb";
import { UserInfo } from "../../../proto/common/types_pb";
import { SignUpUseCase } from "../../applications/usecases/SignUpUseCase";
import { SignInUseCase } from "../../applications/usecases/SignInUseCase";
import { ValidateTokenUseCase } from "../../applications/usecases/ValidateTokenUseCase";
import { RefreshTokenUseCase } from "../../applications/usecases/RefreshTokenUseCase";
import { withErrorHandler } from "./ErrorHandler";

export class AuthServiceHandler {
    constructor(
        private signUpUseCase: SignUpUseCase,
        private signInUseCase: SignInUseCase,
        private validateTokenUseCase: ValidateTokenUseCase,
        private refreshTokenUseCase: RefreshTokenUseCase
    ) {}

    signUp = withErrorHandler(
        async (req: SignUpRequest): Promise<AuthResponse> => {
            const { email, password, displayName } = req;

            const result = await this.signUpUseCase.execute({
                email,
                password,
                displayName,
            });

            return new AuthResponse({
                user: new UserInfo({
                    id: result.user.id,
                    email: result.user.email,
                    displayName: result.user.displayName,
                }),
                accessToken: result.tokens.accessToken,
                refreshToken: result.tokens.refreshToken,
            });
        }
    );

    signIn = withErrorHandler(
        async (req: SignInRequest): Promise<AuthResponse> => {
            const { email, password } = req;

            const result = await this.signInUseCase.execute({
                email,
                password,
            });

            return new AuthResponse({
                user: new UserInfo({
                    id: result.user.id,
                    email: result.user.email,
                    displayName: result.user.displayName,
                }),
                accessToken: result.tokens.accessToken,
                refreshToken: result.tokens.refreshToken,
            });
        }
    );

    validateToken = withErrorHandler(
        async (req: ValidateTokenRequest): Promise<ValidateTokenResponse> => {
            const { token } = req;

            const result = await this.validateTokenUseCase.execute({ token });

            return new ValidateTokenResponse({
                valid: result.valid,
                userId: result.userId ?? "",
            });
        }
    );

    refreshToken = withErrorHandler(
        async (req: RefreshTokenRequest): Promise<AuthResponse> => {
            const { refreshToken } = req;

            const result = await this.refreshTokenUseCase.execute({
                refreshToken,
            });

            return new AuthResponse({
                user: new UserInfo({
                    id: "",
                    email: "",
                    displayName: "",
                }),
                accessToken: result.accessToken,
                refreshToken: result.refreshToken,
            });
        }
    );
}

export const authServiceHandler = {
    signUp: async (req: SignUpRequest) => authServiceHandlerImpl.signUp(req),
    signIn: async (req: SignInRequest) => authServiceHandlerImpl.signIn(req),
    validateToken: async (req: ValidateTokenRequest) =>
        authServiceHandlerImpl.validateToken(req),
    refreshToken: async (req: RefreshTokenRequest) =>
        authServiceHandlerImpl.refreshToken(req),
};

let authServiceHandlerImpl: AuthServiceHandler;
export const setAuthHandler = (handler: AuthServiceHandler) => {
    authServiceHandlerImpl = handler;
};
