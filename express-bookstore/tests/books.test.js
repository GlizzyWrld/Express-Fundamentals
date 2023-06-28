process.env.NODE_ENV = "test"

const request = require('supertest');

const app = require('../app');
const db = require('../db');

let book_isbn;

beforeEach(async () => {
    let result = await db.query(`INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year) VALUES ('1253564528', 'https://amazon.com/markers', 'Grant', 'English', 100, 'Great Creations', 'First Book Ever', 1997) RETURNING isbn`);

    book_isbn = result.rows[0].isbn
});


describe("GET /books", function () {
    test("Gets books", async function () {
      const response = await request(app).get('/books');
      const books = response.body.books;
      expect(books).toHaveLength(1);
      expect(response.statusCode.toBe(200))
    });
  });


describe("GET /books/:isbn", function () {
    test("Get a single book", async function () {
        const response = await request(app).get(`/books/${book_isbn}`);
        expect(response.body.book).toHaveProperty('isbn');
        expect(response.statusCode.toBe(200))
    });
    test("Responds 404 status if book is not found", async function () {
        const response = await request(app).get('/books/777');
        expect(response.statusCode).toBe(404);
    });
});

describe("POST /books", function () {
    test("Creates a new book", async function () {
        const response = await request(app).post('/books').send({
            isbn: '123545621',
            amazon_url: 'https://dogs.com',
            author: 'dexter',
            language: 'english',
            pages: 1111,
            publisher: 'Dexter Laboratories',
            title: 'The Best Day Ever',
            year: 2016
        });
        expect(response.statusCode).toBe(201);
        expect(response.body.book).toHaveProperty('isbn');
    });
    test("Errors when book trying to be created without a title", async function () {
        const response = await request(app).post('/books').send({author: 'Butcher', year: 2022});
        expect(response.statusCode).toBe(400);
    });
});

describe("DELETE /books/:id", function () {
    test("Deletes a single a book", async function () {
      const response = await request(app)
          .delete(`/books/${book_isbn}`)
      expect(response.body).toEqual({message: "Book deleted"});
    });
  });


afterEach(async function () {
    await db.query("DELETE FROM BOOKS");
});
  
  
afterAll(async function () {
    await db.end()
});