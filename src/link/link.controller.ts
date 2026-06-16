import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateShortUrlDto } from './dto/CreateShortUrl.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Links')
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @ApiOperation({
    summary: 'Получить список ссылок',
    description: 'Возвращает список со всеми фильмами',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Ссылки найдены' })
  @Get()
  getAll() {
    return this.linkService.getAll();
  }
  @Post('links')
  create(@Body() dto: CreateShortUrlDto) {
    return this.linkService.createShortUrl(dto);
  }

  @Get(':code')
  async redirect(@Param('code') code: string, @Res() res: any) {
    const url = await this.linkService.getOriginalUrl(code);
    res.redirect(url);
  }
}
