import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { Types } from 'mongoose';

describe('PortfolioController', () => {
  let controller: PortfolioController;
  const mockPortfolioService = {
    create: jest.fn((dto) => {
      return {
        _id: 'mockedId',
        ...dto,
      };
    }),
    updateMenu: jest.fn().mockImplementation((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioController],
      providers: [PortfolioService],
    })
      .overrideProvider(PortfolioService)
      .useValue(mockPortfolioService)
      .compile();

    controller = module.get<PortfolioController>(PortfolioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a menu', () => {
    const menuDto = {
      navigation: 'string',
      image: 'string',
    };
    return controller.create(menuDto).then((result) => {
      expect(result).toEqual({
        _id: 'mockedId',
        navigation: 'string',
        image: 'string',
      });
      expect(mockPortfolioService.create).toHaveBeenCalledWith(menuDto);
    });
  });

  it('should update a menu', () => {
    const menuId = '6483f4b9dd203f39486b36cb';
    const menuDto = {
      navigation: 'menu',
      image: 'menu',
    };

    return controller.updateMenu(menuId, menuDto).then((result) => {
      console.log(typeof menuId);
      expect(result).toEqual({
        id: menuId,
        navigation: 'menu',
        image: 'menu',
      });
      // const test = menuId.toHexString();
      expect(mockPortfolioService.updateMenu).toHaveBeenCalledWith(
        menuId,
        menuDto,
      );
    });
  });
});
