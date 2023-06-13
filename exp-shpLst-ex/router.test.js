process.env.NODE_ENV - "test";

const request = require('supertest');
const app = require('./app');
let items = require('./fakeDb')

let item = { name: 'chicken', price: 10 }

beforeEach(() => {
    // add item to list
    items.push(item)
});

afterEach(() => {
    items = [];
})

describe('GET/items', () => {
  test('Getting all items', async () => {
    res = await request(app).get('/items');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{name: 'chicken', price: 10}]);
    })
});

describe('POST/items', () => {
  test("Adding item to list", async () => {
    res = await request(app).post('/items').send({name: 'potato', price: 15});
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({"added": {name: 'potato', price: 15}})
  })
})

describe('PATCH/items/:name', () => {
  test("Adding item to list", async () => {
    res = await request(app).patch(`/items/${item.name}`).send({name: 'potato'});
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({name: 'potato', price: 10})
  })
  test("Responds 500 for invalid name", async () => {
    const res = await request(app).patch(`/items/pools`).send({name: 'pool'});
    expect(res.statusCode).toBe(500);
  })
})


describe('DELETE/items/:name', () => {
  test("Deleting item from list", async () => {
    res = await request(app).delete(`/items/${item.name}`).send({name: 'potato', price: 15});
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({message:'Deleted', name: 'potato'})
  })
})