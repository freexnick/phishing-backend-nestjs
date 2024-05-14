import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { Model, Types } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { PartialUserDto, UserDto } from "../dto/user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

    async getUser(email: string): Promise<UserDto & { _id: Types.ObjectId }> {
        try {
            const user = await this.userModel.findOne({ email });
            return user;
        } catch (e) {
            throw InternalServerErrorException;
        }
    }

    async createUser(userDto: UserDto): Promise<UserDto & { _id: Types.ObjectId }> {
        try {
            const user = await this.userModel.create(userDto);
            return user;
        } catch (e) {
            throw InternalServerErrorException;
        }
    }

    async getUsers(): Promise<UserDto[]> {
        try {
            const users = await this.userModel.find({}).sort({ createdAt: -1 });
            return users;
        } catch (e) {
            throw InternalServerErrorException;
        }
    }

    async updateUser(id: string, userDto: PartialUserDto): Promise<UserDto> {
        try {
            const user = await this.userModel.findOneAndUpdate({ _id: id }, { $set: userDto }, { new: true });
            return user;
        } catch (e) {
            throw InternalServerErrorException;
        }
    }

    async deleteUser(id: string): Promise<void> {
        try {
            await this.userModel.findOneAndDelete({ _id: id });
        } catch (e) {
            throw InternalServerErrorException;
        }
    }
}
