-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table if exists books;
DROP table if exists authors;

CREATE table books (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    released INT NOT NULL
);

INSERT INTO books (name) VALUES ('Spice and Wolf', 'Isuna Hasekura', '2006')