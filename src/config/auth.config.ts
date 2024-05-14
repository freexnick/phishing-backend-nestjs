import { registerAs } from "@nestjs/config";

export default registerAs("auth", () => ({
    SALT: process.env.BCRYPT_SALT,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_TTL: process.env.JWT_TTL,
}));
