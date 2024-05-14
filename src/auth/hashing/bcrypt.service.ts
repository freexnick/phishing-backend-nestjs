import authConfig from "src/config/auth.config";
import { Inject, Injectable } from "@nestjs/common";
import { HashingService } from "./hashing.service";
import { genSalt, hash, compare } from "bcrypt";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class BcryptService implements HashingService {
    constructor(@Inject(authConfig.KEY) private readonly authConfiguration: ConfigType<typeof authConfig>) {}

    async hash(data: string | Buffer): Promise<string> {
        const salt = await genSalt(+this.authConfiguration.SALT);
        return hash(data, salt);
    }
    async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
        return compare(data, encrypted);
    }
}
