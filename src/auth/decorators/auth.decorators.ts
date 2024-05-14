import { SetMetadata } from "@nestjs/common";
import { AuthType } from "../enums/auth.enums";

export const AUTH_TYPE_KEY = "authType";

export const Auth = (...authTypes: AuthType[]) => {
    return SetMetadata(AUTH_TYPE_KEY, authTypes);
};
