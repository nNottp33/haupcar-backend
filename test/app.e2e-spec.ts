import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Cars CRUD (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true })
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('creates, lists, updates, then deletes a car', async () => {
    const licensePlate = `e2e-${Date.now()}`;
    const createRes = await request(app.getHttpServer())
      .post('/api/cars')
      .send({
        licensePlate,
        brand: 'Toyota',
        model: 'Corolla',
        notes: 'created by e2e test',
      })
      .expect(201);

    expect(createRes.body.statusCode).toBe(201);
    expect(createRes.body.data).toBeUndefined();

    const listRes = await request(app.getHttpServer())
      .get('/api/cars')
      .expect(200);
    const created = listRes.body.data.find(
      (car) => car.licensePlate === licensePlate
    );
    expect(created).toBeDefined();
    const carId = created.id;

    await request(app.getHttpServer())
      .patch(`/api/cars/${carId}`)
      .send({ notes: 'updated by e2e test' })
      .expect(200);
    const getRes = await request(app.getHttpServer())
      .get(`/api/cars/${carId}`)
      .expect(200);
    expect(getRes.body.data.notes).toBe('updated by e2e test');

    await request(app.getHttpServer()).delete(`/api/cars/${carId}`).expect(200);

    await request(app.getHttpServer()).get(`/api/cars/${carId}`).expect(404);
  });
});
