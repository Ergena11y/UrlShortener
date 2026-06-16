import { IsNotEmpty, IsUrl } from 'class-validator';

export class CreateShortUrlDto {
  @IsUrl(
    {
      protocols: ['http', 'https', 'wss', 'ftp', 'mailto', 'file'],
      require_valid_protocol: true,
    },
    { message: 'Некоректный формат URL' },
  )
  @IsNotEmpty()
  link: string;
}
