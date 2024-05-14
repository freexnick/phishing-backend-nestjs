import swaggerConfig from "./config/swagger.config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { corsOptions } from "./config/cors.config";
import { SERVER_PORT } from "./config/constants";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors(corsOptions);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    swaggerConfig(app);

    await app.listen(SERVER_PORT);
}
bootstrap();
