import authConfig from "src/config/auth.config";
import { Module } from "@nestjs/common";
import { BcryptService } from "./hashing/bcrypt.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { HashingService } from "./hashing/hashing.service";
import { JwtModule } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guards/auth.guard";
import { AccessTokenGuard } from "./guards/access-token.guard";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        ConfigModule.forFeature(authConfig),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                return {
                    secret: config.get<string>("JWT_SECRET"),
                    signOptions: {
                        expiresIn: config.get<string>("JWT_TTL"),
                    },
                };
            },
        }),
        UserModule,
    ],
    providers: [
        {
            provide: HashingService,
            useClass: BcryptService,
        },
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        AuthService,
        AccessTokenGuard,
    ],
    controllers: [AuthController],
})
export class AuthModule {}
