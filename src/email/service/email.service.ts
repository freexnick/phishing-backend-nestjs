import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Email } from "../entity/email.entity";
import { Model } from "mongoose";
import { EmailDto, PartialEmailDto } from "../dto/email.dto";
import { v4 as uuid } from "uuid";
import { ConfigService } from "@nestjs/config";
import { MailerService } from "@nestjs-modules/mailer";
import { MailerDto } from "../dto/mailer.dto";

@Injectable()
export class EmailService {
    constructor(
        @InjectModel(Email.name) private readonly emailModel: Model<Email>,
        private readonly emailConfiguration: ConfigService,
        private readonly mailService: MailerService,
    ) {}

    async create(emailDto: PartialEmailDto): Promise<EmailDto> {
        try {
            const uid = uuid();

            const mail: MailerDto = {
                from: this.emailConfiguration.get<string>("MAIL_USER"),
                to: emailDto.email,
                subject: "Phishing Test Email",
                html: `<a href='http://localhost:4000/email/${uid}'>This is a phishing test email. Please do not click on any links or attachments.</a>`,
            };
            const createdMail = await this.emailModel.create({
                uuid: uid,
                email: emailDto.email,
                content: mail.html,
            } as EmailDto);
            this.mailService.sendMail(mail);
            return createdMail;
        } catch (e) {
            throw InternalServerErrorException;
        }
    }

    async updateMail(uuid: string): Promise<void> {
        try {
            await this.emailModel.findOneAndUpdate({ uuid: uuid }, { phishingStatus: true });
        } catch (e) {
            throw InternalServerErrorException;
        }
    }

    async getMails(): Promise<EmailDto[]> {
        try {
            const email = await this.emailModel.find({}).sort({ createdAt: -1 });
            return email;
        } catch (e) {
            throw InternalServerErrorException;
        }
    }

    async deleteMail(id: string): Promise<void> {
        try {
            await this.emailModel.findOne({ _id: id });
        } catch (e) {
            throw InternalServerErrorException;
        }
    }
}
