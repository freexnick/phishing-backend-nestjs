import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const options = new DocumentBuilder().setTitle("Phishing").setDescription("Phishing with Nestjs").setVersion("1.0").build();

export default function (app: INestApplication) {
    const document = SwaggerModule.createDocument(app, options);
    return SwaggerModule.setup("api-docs", app, document);
}
