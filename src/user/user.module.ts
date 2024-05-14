import { Module } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema, User } from "./entities/user.entity";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService, UserService],
    exports: [UserService],
})
export class UserModule {}
