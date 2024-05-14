import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @MinLength(4)
    @MaxLength(255)
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsStrongPassword()
    @MinLength(4)
    @MaxLength(255)
    readonly password: string;
}

export class PartialUserDto extends PartialType(UserDto) {}
