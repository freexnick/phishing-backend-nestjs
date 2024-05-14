import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class EmailDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    readonly uuid: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(255)
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(255)
    readonly content: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    readonly phishingStatus: boolean;
}

export class PartialEmailDto extends PartialType(EmailDto) {}
