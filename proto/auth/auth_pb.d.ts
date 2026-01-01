import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { UserInfo } from "../common/types_pb.js";
/**
 * @generated from message auth.SignUpRequest
 */
export declare class SignUpRequest extends Message<SignUpRequest> {
    /**
     * @generated from field: string email = 1;
     */
    email: string;
    /**
     * @generated from field: string password = 2;
     */
    password: string;
    /**
     * @generated from field: string display_name = 3;
     */
    displayName: string;
    constructor(data?: PartialMessage<SignUpRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "auth.SignUpRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SignUpRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SignUpRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SignUpRequest;
    static equals(a: SignUpRequest | PlainMessage<SignUpRequest> | undefined, b: SignUpRequest | PlainMessage<SignUpRequest> | undefined): boolean;
}
/**
 * @generated from message auth.SignInRequest
 */
export declare class SignInRequest extends Message<SignInRequest> {
    /**
     * @generated from field: string email = 1;
     */
    email: string;
    /**
     * @generated from field: string password = 2;
     */
    password: string;
    constructor(data?: PartialMessage<SignInRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "auth.SignInRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): SignInRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): SignInRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): SignInRequest;
    static equals(a: SignInRequest | PlainMessage<SignInRequest> | undefined, b: SignInRequest | PlainMessage<SignInRequest> | undefined): boolean;
}
/**
 * @generated from message auth.AuthResponse
 */
export declare class AuthResponse extends Message<AuthResponse> {
    /**
     * @generated from field: string access_token = 1;
     */
    accessToken: string;
    /**
     * @generated from field: string refresh_token = 2;
     */
    refreshToken: string;
    /**
     * @generated from field: common.UserInfo user = 3;
     */
    user?: UserInfo;
    constructor(data?: PartialMessage<AuthResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "auth.AuthResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): AuthResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): AuthResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): AuthResponse;
    static equals(a: AuthResponse | PlainMessage<AuthResponse> | undefined, b: AuthResponse | PlainMessage<AuthResponse> | undefined): boolean;
}
/**
 * @generated from message auth.ValidateTokenRequest
 */
export declare class ValidateTokenRequest extends Message<ValidateTokenRequest> {
    /**
     * @generated from field: string token = 1;
     */
    token: string;
    constructor(data?: PartialMessage<ValidateTokenRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "auth.ValidateTokenRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ValidateTokenRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ValidateTokenRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ValidateTokenRequest;
    static equals(a: ValidateTokenRequest | PlainMessage<ValidateTokenRequest> | undefined, b: ValidateTokenRequest | PlainMessage<ValidateTokenRequest> | undefined): boolean;
}
/**
 * @generated from message auth.ValidateTokenResponse
 */
export declare class ValidateTokenResponse extends Message<ValidateTokenResponse> {
    /**
     * @generated from field: bool valid = 1;
     */
    valid: boolean;
    /**
     * @generated from field: string user_id = 2;
     */
    userId: string;
    constructor(data?: PartialMessage<ValidateTokenResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "auth.ValidateTokenResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ValidateTokenResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ValidateTokenResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ValidateTokenResponse;
    static equals(a: ValidateTokenResponse | PlainMessage<ValidateTokenResponse> | undefined, b: ValidateTokenResponse | PlainMessage<ValidateTokenResponse> | undefined): boolean;
}
/**
 * @generated from message auth.RefreshTokenRequest
 */
export declare class RefreshTokenRequest extends Message<RefreshTokenRequest> {
    /**
     * @generated from field: string refresh_token = 1;
     */
    refreshToken: string;
    constructor(data?: PartialMessage<RefreshTokenRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "auth.RefreshTokenRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): RefreshTokenRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): RefreshTokenRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): RefreshTokenRequest;
    static equals(a: RefreshTokenRequest | PlainMessage<RefreshTokenRequest> | undefined, b: RefreshTokenRequest | PlainMessage<RefreshTokenRequest> | undefined): boolean;
}
/**
 * @generated from message auth.LogoutRequest
 */
export declare class LogoutRequest extends Message<LogoutRequest> {
    /**
     * @generated from field: string refresh_token = 1;
     */
    refreshToken: string;
    constructor(data?: PartialMessage<LogoutRequest>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "auth.LogoutRequest";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LogoutRequest;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LogoutRequest;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LogoutRequest;
    static equals(a: LogoutRequest | PlainMessage<LogoutRequest> | undefined, b: LogoutRequest | PlainMessage<LogoutRequest> | undefined): boolean;
}
/**
 * @generated from message auth.LogoutResponse
 */
export declare class LogoutResponse extends Message<LogoutResponse> {
    /**
     * @generated from field: bool success = 1;
     */
    success: boolean;
    constructor(data?: PartialMessage<LogoutResponse>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "auth.LogoutResponse";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): LogoutResponse;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): LogoutResponse;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): LogoutResponse;
    static equals(a: LogoutResponse | PlainMessage<LogoutResponse> | undefined, b: LogoutResponse | PlainMessage<LogoutResponse> | undefined): boolean;
}
//# sourceMappingURL=auth_pb.d.ts.map