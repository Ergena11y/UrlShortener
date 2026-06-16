import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkEntity } from './entities/link.entity';
import { CreateShortUrlDto } from './dto/CreateShortUrl.dto';

const links: LinkEntity[] = [
  {
    id: 1,
    code: '1juebw',
    originalUrl:
      'https://rezka.ag/films/drama/806-pobeg-iz-shoushenka-1994-latest.html',
    clicks: 0,
    createdAt: new Date(),
  },
  {
    id: 2,
    code: '2rj95d',
    originalUrl: 'https://github.com/',
    clicks: 0,
    createdAt: new Date(),
  },
];

const link: LinkEntity = links[0];

const dto: CreateShortUrlDto = {
  link: 'https://github.com/',
};

describe('Link Service', () => {
  let service: LinkService;
  let repository: Record<string, jest.Mock>;

  const db = {
    find: jest.fn().mockResolvedValue(links),
    findOne: jest.fn().mockResolvedValue(link),
    create: jest.fn().mockReturnValue(link),
    save: jest.fn().mockResolvedValue(link),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LinkService,
        {
          provide: getRepositoryToken(LinkEntity),
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<LinkService>(LinkService);
    repository = module.get(getRepositoryToken(LinkEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of links', async () => {
    const result = await service.getAll();
    expect(result).toEqual(links);
  });

  it('should return existing link if originalUrl already exists', async () => {
    repository.findOne.mockResolvedValueOnce(link);
    const result = await service.createShortUrl(dto);
    expect(result).toEqual(link);
  });
  it('should create a new link if it does not exist', async () => {
    repository.findOne.mockResolvedValueOnce(null);

    const result = await service.createShortUrl(dto);

    expect(result).toEqual(link);
  });

  it('should return original url and increment clicks', async () => {
    const result = await service.getOriginalUrl(link.code);
    expect(result).toEqual(link.originalUrl);
  });

  it('should throw an exception if link not found', async () => {
    repository.findOne.mockResolvedValueOnce(null);

    await expect(service.getOriginalUrl('unknown')).rejects.toThrow(
      NotFoundException,
    );
  });
});
