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

  it('/authors/:id should return authors details', async () => {
    const resp = await request(app).get('/authors/1');
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: '1',
      name: 'Isuna Hasekura',
      dob: '1982',
    });
  });

  it('POST /authors should add a new author', async () => {
    const resp = await request(app).post('/authors').send({
      name: 'Isuna Hasekura',
      dob: '1982',
    });
    expect(resp.status).toEqual(200);
    expect(resp.body.name).toEqual('Isuna Hasekura');
    expect(resp.body.dob).toEqual('1982');
    expect(resp.body.id).not.toBeUndefined();
  });

  afterAll(() => {
    pool.end();
  });
});
