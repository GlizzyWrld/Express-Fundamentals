const express = require('express');
const Item = require('./item')
const router = new express.Router();
const items = require('./fakeDb');
const ExpressError = require('./expressError');

// Get /items - Get all items
router.get('/', (req, res, next) => {
    try {
      const items = Item.findAll();
      res.json(items);
    } catch (err) {
      next(err);
    }
  });


// Post /items - Add a new item to list
router.post('/', (req, res, next) => {
    try{
        const { name, price } = req.body;
        const newItem = new Item(name, price);
        items.push(newItem);
        return res.status(201).json({ added: newItem });
    } catch (err) {
        next(err);
    }
})


// Get /items/:name - Get a single item by name 
router.get('/:name', (req, res, next) => {
    try {
        const name = req.params.name;
        const item = items.find(item => item.name === name);
        return res.json({name: item.name, price: item.price})
    } catch (err) {
        return next(err);
    }
});


// PATCH /items/:name - Update a single item by name
router.patch('/:name', (req, res, next) => {
    try{
        const name = req.params.name;
        const item = items.find(item => item.name === name);
        item.name = req.body.name; 
        return res.json({name: item.name, price: item.price})
    } catch (err) {
        next(err);
    }
});


// DELETE /items/:name - Delete a single item by name
router.delete('/:name', (req, res, next) => {
    try {
        const name = req.params.name;
        const itemIndex = items.findIndex(item => item.name === name);
        if (itemIndex === -1) {
            throw new ExpressError('Item not found', 404);
        }

        items.splice(itemIndex, 1);
        return res.json({message: 'Deleted', name})
    } catch {
        throw new ExpressError("Error deleting item", 404);
    }
})


module.exports = router;