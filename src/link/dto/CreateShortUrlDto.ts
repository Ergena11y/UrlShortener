import { IsNotEmpty, IsUrl } from "class-validator";

export class CreateShortUrlDto {
    @IsUrl(
        { protocols: ['https', 'wss'], require_valid_protocol: true},
        {message: "Некоректный формат URL"}
    )
    @IsNotEmpty()
    link: string;
}