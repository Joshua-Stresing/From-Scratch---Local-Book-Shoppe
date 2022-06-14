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
    expect(res.body.length).toEqual(2);
    const saw = res.body.find((char) => char.id === '1');
    expect(saw).toHaveProperty('name', 'Spice and Wolf');
    expect(saw).toHaveProperty('released', 2006);
  });

  afterAll(() => {
    pool.end();
  });
});
