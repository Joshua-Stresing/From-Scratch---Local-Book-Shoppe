const pool = require('../utils/pool');

class Book {
  id;
  name;
  released;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.released = row.released;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM books');
    return rows.map((row) => new Book(row));
  }

  // static async getById(id) {
  //   const { rows } = await pool.query('SELECT * FROM books WHERE id=$1;', [id]);
  //   if (!rows[0]) return null;

  //   return new Book(rows[0]);
  // }
}
module.exports = { Book };
