-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE if exists books;
DROP TABLE if exists authors;

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    author VARCHAR NOT NULL,
    released INT NOT NULL
);

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    dob VARCHAR NOT NULL
);

INSERT INTO books (name, author, released)
VALUES ('Spice and Wolf', 'Isuna Hasekura', 2006), ('Mushoku Tensei', 'Rifujin na Magonote', 2014);

INSERT INTO authors (name, dob)
VALUES ('Isuna Hasekura', '1982'), ('Rifujin na Magonote', 'N/A');

