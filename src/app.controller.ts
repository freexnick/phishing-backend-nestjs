import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiTags } from "@nestjs/swagger";
import { Auth } from "./auth/decorators/auth.decorators";
import { AuthType } from "./auth/enums/auth.enums";

@ApiTags("healthcheck")
@Auth(AuthType.None)
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
