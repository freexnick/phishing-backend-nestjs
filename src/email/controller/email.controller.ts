import { Get, Param, Post, Body, Delete } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { EmailService } from "../service/email.service";
import { EmailDto, PartialEmailDto } from "../dto/email.dto";
import { ApiTags } from "@nestjs/swagger";
import { Auth } from "src/auth/decorators/auth.decorators";
import { AuthType } from "src/auth/enums/auth.enums";

@ApiTags("email")
@Auth(AuthType.Bearer)
@Controller("email")
export class EmailController {
    constructor(private readonly emailService: EmailService) {}

    @Get()
    findAll(): Promise<EmailDto[]> {
        return this.emailService.getMails();
    }

    @Get(":id")
    findOne(@Param("id") uuid: string) {
        return this.emailService.updateMail(uuid);
    }

    @Post()
    create(@Body() emailDto: PartialEmailDto) {
        return this.emailService.create(emailDto);
    }

    @Delete(":id")
    deleteMail(@Param("id") id: string) {
        return this.emailService.deleteMail(id);
    }
}
