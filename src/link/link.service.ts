import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkEntity } from 'link/entities/link.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(LinkEntity)
    private readonly linkRepository: Repository<LinkEntity>,
  ) {}

  async findAll(): Promise<LinkEntity[]> {
    return await this.linkRepository.find();
  }

  getOriginalUrl(code: string) {}

}