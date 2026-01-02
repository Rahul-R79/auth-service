import { ConnectRouter } from "@connectrpc/connect";
import { AuthService } from "../../../proto/auth/auth_connect";
import {
    SignUpRequest,
    SignInRequest,
    ValidateTokenRequest,
    AuthResponse,
    RefreshTokenRequest,
    ValidateTokenResponse,
    LogoutRequest,
    LogoutResponse,
} from "../../../proto/auth/auth_pb";
import { UserInfo } from "../../../proto/common/types_pb";
import { SignUpUseCase } from "../../applications/usecases/SignUpUseCase";
import { SignInUseCase } from "../../applications/usecases/SignInUseCase";
import { ValidateTokenUseCase } from "../../applications/usecases/ValidateTokenUseCase";
import { RefreshTokenUseCase } from "../../applications/usecases/RefreshTokenUseCase";
import { LogoutUseCase } from "../../applications/usecases/UserLogoutUseCase";
import { withErrorHandler } from "./ErrorHandler";

export const authServiceHandler = (
    router: ConnectRouter,
    useCases: {
        signUp: SignUpUseCase;
        signIn: SignInUseCase;
        validateToken: ValidateTokenUseCase;
        refreshToken: RefreshTokenUseCase;
        logout: LogoutUseCase;
    }
) => {
    router.service(AuthService, {
        signUp: withErrorHandler(
            async (req: SignUpRequest): Promise<AuthResponse> => {
                const { email, password, displayName } = req;

                const result = await useCases.signUp.execute({
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
        ),

        signIn: withErrorHandler(
            async (req: SignInRequest): Promise<AuthResponse> => {
                const { email, password } = req;

                const result = await useCases.signIn.execute({
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
        ),

        validateToken: withErrorHandler(
            async (req: ValidateTokenRequest): Promise<ValidateTokenResponse> => {
                const { token } = req;

                const result = await useCases.validateToken.execute({ token });

                return new ValidateTokenResponse({
                    valid: result.valid,
                    userId: result.userId ?? "",
                });
            }
        ),

        refreshToken: withErrorHandler(
            async (req: RefreshTokenRequest): Promise<AuthResponse> => {
                const { refreshToken } = req;

                const result = await useCases.refreshToken.execute({
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
        ),

        logout: withErrorHandler(
            async (req: LogoutRequest): Promise<LogoutResponse> => {
                await useCases.logout.execute({
                    refreshToken: req.refreshToken,
                });
                return new LogoutResponse({ success: true });
            }
        ),
    });
};
