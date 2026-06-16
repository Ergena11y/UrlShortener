import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';

const link = {
  id: 1,
  code: 't4ww3yum',
  originalUrl:
    'https://rezka.ag/films/drama/806-pobeg-iz-shoushenka-1994-latest.html',
  clicks: 0,
};

describe('Link Controller', () => {
  let controller: LinkController;
  let service: LinkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LinkController],
      providers: [
        {
          provide: LinkService,
          useValue: {
            getAll: jest.fn().mockResolvedValue([link]),
            createShortUrl: jest.fn().mockResolvedValue(link),
            getOriginalUrl: jest.fn().mockResolvedValue(link.originalUrl),
          },
        },
      ],
    }).compile();

    controller = module.get<LinkController>(LinkController);
    service = module.get<LinkService>(LinkService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should return a list of links', async () => {
    const result = await controller.getAll();
    expect(result).toEqual([link]);
  });

  it('Should create a short link', async () => {
    const result = await controller.create({
      link: 'https://rezka.ag/films/drama/806-pobeg-iz-shoushenka-1994-latest.html',
    });
    expect(result.originalUrl).toBe(
      'https://rezka.ag/films/drama/806-pobeg-iz-shoushenka-1994-latest.html',
    );
    expect(result.code).toBeDefined();
  });

  it('Should redirect to the original url', async () => {
    const res = { redirect: jest.fn() };

    await controller.redirect(link.code, res);

    expect(service.getOriginalUrl).toHaveBeenCalledWith(link.code);
    expect(res.redirect).toHaveBeenCalledWith(link.originalUrl);
  });

  it('Should throw an  NotFoundException if link does not exist', async () => {
    jest
      .spyOn(service, 'getOriginalUrl')
      .mockRejectedValueOnce(new NotFoundException('Ссылка не была найдена'));
    const res = { redirect: jest.fn() };

    await expect(controller.redirect('unknown', res)).rejects.toThrow(
      NotFoundException,
    );
    expect(res.redirect).not.toHaveBeenCalled();
  });
});
