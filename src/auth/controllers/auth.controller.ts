import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    InternalServerErrorException,
    Post,
    Res,
    UnauthorizedException,
} from "@nestjs/common";
import { UserDto } from "../../user/dto/user.dto";
import { AuthService } from "../services/auth.service";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { Auth } from "../decorators/auth.decorators";
import { AuthType } from "../enums/auth.enums";

@ApiTags("auth")
@Auth(AuthType.None)
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post("sign-up")
    async signUp(@Res({ passthrough: true }) response: Response, @Body() userDto: UserDto) {
        try {
            const token = await this.authService.signUp(userDto);
            if (token) {
                response.cookie("token", token, {
                    secure: true,
                    httpOnly: true,
                    sameSite: true,
                });
            }
        } catch (e) {
            throw new BadRequestException();
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post("sign-in")
    async signIn(@Res({ passthrough: true }) response: Response, @Body() userDto: UserDto) {
        try {
            const token = await this.authService.signIn(userDto);
            if (!token) {
                throw new UnauthorizedException("Password does not match");
            }

            response.cookie("token", token, {
                secure: true,
                httpOnly: true,
                sameSite: true,
            });
        } catch (e) {
            throw new InternalServerErrorException();
        }
    }
}
