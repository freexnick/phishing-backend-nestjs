import { IsEmail, IsNotEmpty, MaxLength, MinLength, IsString } from "class-validator";
import { Types } from "mongoose";

export class JwtDto {
    @IsNotEmpty()
    @IsEmail()
    @MinLength(4)
    @MaxLength(255)
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(255)
    readonly id: Types.ObjectId;
}
