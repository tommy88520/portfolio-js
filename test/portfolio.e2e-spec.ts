import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { PortfolioModule } from './../src/portfolio/portfolio.module';
import { AppModule } from './../src/app.module';
import { PortfolioService } from './../src/portfolio/portfolio.service';

describe('PortfolioController (e2e)', () => {
  let app: INestApplication;
  const mockUsers = [
    {
      navigation: 'work',
      image: 'none',
    },
  ];
  const mockPortfolioRepo = {
    getAllMenu: jest.fn().mockResolvedValue(mockUsers),
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PortfolioModule, AppModule],
    })
      .overrideProvider(PortfolioService)
      .useValue(mockPortfolioRepo)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/portfolio/get-menu (GET)', () => {
    return request(app.getHttpServer())
      .get('/portfolio/get-menu')
      .expect(200)
      .expect(mockUsers);
  });
});
