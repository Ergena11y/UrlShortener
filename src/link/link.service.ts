import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkEntity } from 'link/entities/link.entity';
import { Repository } from 'typeorm';
import { CreateShortUrlDto } from 'link/dto/CreateShortUrl.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkEntity)
    private readonly linkRepository: Repository<LinkEntity>,
  ) {}

  async createShortUrl(dto: CreateShortUrlDto): Promise<LinkEntity> {
    const code = Math.random().toString(36).substring(2, 10);
    const link = this.linkRepository.create({ code, originalUrl: dto.link });
    return await this.linkRepository.save(link);
  }

  getOriginalUrl(code: string) {}
}
