import { Module } from "@nestjs/common";
import { EmailController } from "./controller/email.controller";
import { EmailService } from "./service/email.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Email, EmailSchema } from "./entity/email.entity";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Email.name,
                schema: EmailSchema,
            },
        ]),
        ConfigModule.forRoot(),
    ],
    controllers: [EmailController],
    providers: [EmailService],
})
export class EmailModule {}
