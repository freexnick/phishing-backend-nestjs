import authConfig from "src/config/auth.config";
import { Inject, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { UserDto } from "../../user/dto/user.dto";
import { HashingService } from "src/auth/hashing/hashing.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigType } from "@nestjs/config";
import { JwtDto } from "../dto/jwt.dto";
import { UserService } from "src/user/service/user.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private readonly hashingService: HashingService,
        private readonly jwtService: JwtService,
        @Inject(authConfig.KEY)
        private readonly authConfiguration: ConfigType<typeof authConfig>,
    ) {}
    async createJWT(user: JwtDto): Promise<string> {
        const token = await this.jwtService.signAsync(
            {
                sub: user.id,
                email: user.email,
            },
            {
                secret: this.authConfiguration.JWT_SECRET,
                expiresIn: this.authConfiguration.JWT_TTL,
            },
        );

        return token;
    }
    async signUp(userDto: UserDto): Promise<string> {
        try {
            const hashedPassword = await this.hashingService.hash(userDto.password);
            const createdUser = await this.userService.createUser({ email: userDto.email, password: hashedPassword });
            const token = await this.createJWT({ id: createdUser._id, email: userDto.email } as JwtDto);
            return token;
        } catch (e) {
            throw InternalServerErrorException;
        }
    }
    async signIn(userDto: UserDto): Promise<string> {
        try {
            const user = await this.userService.getUser(userDto.email);
            if (!user) {
                throw new UnauthorizedException("User does not exists");
            }
            const match = await this.hashingService.compare(userDto.password, user.password);

            if (!match) {
                throw new UnauthorizedException("Password does not match");
            }
            const token = await this.createJWT({ id: user._id, email: userDto.email } as JwtDto);
            return token;
        } catch (e) {
            throw InternalServerErrorException;
        }
    }
}
