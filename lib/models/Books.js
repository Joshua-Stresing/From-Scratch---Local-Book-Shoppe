const pool = require('../utils/pool');

module.export = class Book {
  id;
  name;
  released;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.released = row.released;
  }

  static async getALL() {
    const { rows } = await pool.query('SELECT id, name FROM books');
    return rows.map((row) => new Book(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM cats WHERE id=$1;', [id]);
    if (!rows[0]) return null;

    return new Book(rows[0]);
  }
};
