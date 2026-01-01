import { AuthResponse, LogoutRequest, LogoutResponse, RefreshTokenRequest, SignInRequest, SignUpRequest, ValidateTokenRequest, ValidateTokenResponse } from "./auth_pb.js";
import { MethodKind } from "@bufbuild/protobuf";
/**
 * @generated from service auth.AuthService
 */
export declare const AuthService: {
    readonly typeName: "auth.AuthService";
    readonly methods: {
        /**
         * @generated from rpc auth.AuthService.SignUp
         */
        readonly signUp: {
            readonly name: "SignUp";
            readonly I: typeof SignUpRequest;
            readonly O: typeof AuthResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc auth.AuthService.SignIn
         */
        readonly signIn: {
            readonly name: "SignIn";
            readonly I: typeof SignInRequest;
            readonly O: typeof AuthResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc auth.AuthService.ValidateToken
         */
        readonly validateToken: {
            readonly name: "ValidateToken";
            readonly I: typeof ValidateTokenRequest;
            readonly O: typeof ValidateTokenResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc auth.AuthService.RefreshToken
         */
        readonly refreshToken: {
            readonly name: "RefreshToken";
            readonly I: typeof RefreshTokenRequest;
            readonly O: typeof AuthResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc auth.AuthService.Logout
         */
        readonly logout: {
            readonly name: "Logout";
            readonly I: typeof LogoutRequest;
            readonly O: typeof LogoutResponse;
            readonly kind: MethodKind.Unary;
        };
    };
};
//# sourceMappingURL=auth_connect.d.ts.map