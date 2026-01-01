import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
/**
 * @generated from message common.UserInfo
 */
export declare class UserInfo extends Message<UserInfo> {
    /**
     * @generated from field: string id = 1;
     */
    id: string;
    /**
     * @generated from field: string email = 2;
     */
    email: string;
    /**
     * @generated from field: string display_name = 3;
     */
    displayName: string;
    constructor(data?: PartialMessage<UserInfo>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "common.UserInfo";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): UserInfo;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): UserInfo;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): UserInfo;
    static equals(a: UserInfo | PlainMessage<UserInfo> | undefined, b: UserInfo | PlainMessage<UserInfo> | undefined): boolean;
}
/**
 * @generated from message common.Empty
 */
export declare class Empty extends Message<Empty> {
    constructor(data?: PartialMessage<Empty>);
    static readonly runtime: typeof proto3;
    static readonly typeName = "common.Empty";
    static readonly fields: FieldList;
    static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Empty;
    static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Empty;
    static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Empty;
    static equals(a: Empty | PlainMessage<Empty> | undefined, b: Empty | PlainMessage<Empty> | undefined): boolean;
}
//# sourceMappingURL=types_pb.d.ts.map