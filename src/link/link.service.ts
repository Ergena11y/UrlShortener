import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getAll(): Promise<LinkEntity[]> {
    return await this.linkRepository.find();
  }

  async createShortUrl(dto: CreateShortUrlDto): Promise<LinkEntity> {
    const existing = await this.linkRepository.findOne({
      where: { originalUrl: dto.link },
    });
    if (existing) return existing;
    const code = Math.random().toString(36).substring(2, 8);
    const link = this.linkRepository.create({ code, originalUrl: dto.link });
    return await this.linkRepository.save(link);
  }

  async getOriginalUrl(code): Promise<string> {
    const link = await this.linkRepository.findOne({ where: { code } });
    if (!link) throw new NotFoundException('Ссылка не была найдена');
    link.clicks++;
    await this.linkRepository.save(link);
    return link.originalUrl;
  }
}
