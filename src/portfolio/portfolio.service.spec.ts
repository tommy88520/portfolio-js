import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioService } from './portfolio.service';

describe('PortfolioService', () => {
  let service: PortfolioService;
  const mockMenuRepository = {
    create: jest.fn().mockImplementation((dto) => {
      return dto;
    }),
    save: jest.fn().mockImplementation((menu) =>
      Promise.resolve({
        _id: 'mockId',
        ...menu,
      }),
    ),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortfolioService],
    })
      .overrideProvider(PortfolioService)
      .useValue(mockMenuRepository)
      .compile();

    service = module.get<PortfolioService>(PortfolioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create a new menu record and return that', async () => {
    const menuDto = {
      navigation: 'menu',
      image: 'menu',
    };
    console.log(await service.create(menuDto));
    expect(await service.create(menuDto)).toEqual({
      navigation: 'menu',
      image: 'menu',
    });
  });
});
