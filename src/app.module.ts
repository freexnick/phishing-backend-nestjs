// import appConfig from "./config/app.config";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EmailModule } from "./email/email.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { MailerModule } from "@nestjs-modules/mailer";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const MONGO_URI = `mongodb://${config.get<string>("MONGODB_USERNAME")}:${config.get<string>("MONGODB_PASSWORD")}@${config.get<string>("MONGODB_HOST")}:${config.get<string>("MONGODB_PORT")}/`;
                return {
                    uri: MONGO_URI,
                };
            },
        }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                return {
                    transport: {
                        host: config.get<string>("MAIL_SMTP"),
                        auth: {
                            user: config.get<string>("MAIL_USER"),
                            pass: config.get<string>("MAIL_PASS"),
                        },
                    },
                };
            },
        }),
        AuthModule,
        EmailModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
