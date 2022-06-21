const pool = require('../utils/pool');

class Author {
  id;
  name;
  dob;
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM authors');
    return rows.map((row) => new Author(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM authors WHERE id=$1;', [
      id,
    ]);
    if (!rows[0]) return null;

    return new Author(rows[0]);
  }
}
module.exports = { Author };
