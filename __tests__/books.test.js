const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('list of books', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST /books should create a new book with an author', async () => {
    const resp = await request(app)
      .post('/books')
      .send({ name: 'Spice and Wolf', released: 2006, authorIds: [1, 2] });
    expect(resp.status).toBe(200);
    expect(resp.body.name).toBe('Spice and Wolf');

    const { body: saw } = await request(app).get(`/books/${resp.body.id}`);
    console.log(saw);
    expect(saw.authors.length).toBe(2);
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

      authors: [
        {
          dob: '1982',
          id: 1,
          name: 'Isuna Hasekura',
        },
      ],
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
