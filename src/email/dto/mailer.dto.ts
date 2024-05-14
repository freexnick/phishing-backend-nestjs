import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class MailerDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(255)
    readonly from: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(255)
    readonly to: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(255)
    readonly subject: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(255)
    readonly html: string;
}
