const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('list of authors', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should fetch and return a list of authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(2);
    const saw = res.body.find((char) => char.id === '1');
    expect(saw).toHaveProperty('name', 'Isuna Hasekura');
    expect(saw).toHaveProperty('dob', '1982');
  });

  afterAll(() => {
    pool.end();
  });
});
