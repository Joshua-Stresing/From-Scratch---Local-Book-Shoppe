const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('list of books', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should fetch and return a list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(3);
    const saw = res.body.find((char) => char.id === '1');
    expect(saw).toHaveProperty('name', 'Spice and Wolf');
    expect(saw).toHaveProperty('released', 2006);
  });

  it('/books/:id should return books details', async () => {
    const resp = await request(app).get('/books/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Spice and Wolf',
      released: 2006,
    });
  });

  it('POST /books should add a new book', async () => {
    const resp = await request(app).post('/books').send({
      name: 'Spice and Wolf',
      released: 2006,
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Spice and Wolf');
    expect(resp.body.released).toEqual(2006);
    expect(resp.body.id).not.toBeUndefined();
  });

  afterAll(() => {
    pool.end();
  });
});
