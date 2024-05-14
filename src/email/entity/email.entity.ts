import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Email extends Document {
    @Prop({
        required: true,
        index: true,
    })
    readonly uuid: string;

    @Prop({ required: true })
    readonly email: string;

    @Prop({ required: true })
    readonly content: string;

    @Prop({ required: true, default: false })
    readonly phishingStatus: boolean;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
