import { Body, Controller, Patch, Get, Param, Delete } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { PartialUserDto } from "../dto/user.dto";
import { ApiTags } from "@nestjs/swagger";
import { Auth } from "src/auth/decorators/auth.decorators";
import { AuthType } from "src/auth/enums/auth.enums";

@Auth(AuthType.None)
@ApiTags("user")
@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    finAll() {
        return this.userService.getUsers();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.userService.getUser(id);
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() userDto: PartialUserDto) {
        return this.userService.updateUser(id, userDto);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.userService.deleteUser(id);
    }
}
