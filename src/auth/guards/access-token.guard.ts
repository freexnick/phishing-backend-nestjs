import authConfig from "src/config/auth.config";
import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { REQUEST_USER_KEY } from "src/auth/constants";

@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(
        @Inject(authConfig.KEY) private readonly authConfiguration: ConfigType<typeof authConfig>,
        private readonly jwtService: JwtService,
    ) {}

    private extractToken(request: Request) {
        const token = request.headers.cookie || "";
        if (!token) {
            throw new UnauthorizedException();
        }
        return token;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const token = this.extractToken(request).split("=")[1];

            const payload = await this.jwtService.verify(token, {
                secret: this.authConfiguration.JWT_SECRET,
            });

            request[REQUEST_USER_KEY] = payload;

            return true;
        } catch (e) {
            throw new UnauthorizedException();
        }
    }
}
