import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateShortUrlDto } from './dto/CreateShortUrlDto';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post('links')
  create(@Body() dto: CreateShortUrlDto){ }

  @Get(':code')
 async redirect(@Param('code') code: string, @Res() res: any) {
  const url = await this.linkService.getOriginalUrl(code);
  res.redirect(url);
}
  
}
