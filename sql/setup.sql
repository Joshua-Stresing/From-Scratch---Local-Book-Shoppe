-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE if exists books;
DROP TABLE if exists authors;
DROP TABLE if exists bookauth;

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    released INT NOT NULL
);

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    dob VARCHAR NOT NULL
);

CREATE TABLE bookauth (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_id INT NOT NULL,
    book_id INT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO books (name, released)
VALUES ('Spice and Wolf', 2006), ('Mushoku Tensei', 2014), ('Combo Test', 2022);

INSERT INTO authors (name, dob)
VALUES ('Isuna Hasekura', '1982'), ('Rifujin na Magonote', 'N/A');

INSERT INTO bookauth (author_id, book_id)
VALUES
(1, 1), (2, 2), (1, 3), (2, 3);
