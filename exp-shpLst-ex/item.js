const items = require("./fakeDb")

class Item {
    constructor(name, price){
        this.name = name;
        this.price = price;
    }

    static findAll() {
        return items;
    }

    static findByName(name){
        const item = items.find((i) => item.name === name);
        if (!item){
            throw new ExpressError('Not Found', 404)
        }
        return item;
    }

    static update(name, updatedItem) {
        let item = Item.findByName(name);
        item.name = updatedItem.name || item.name;
        item.price = updatedItem.price || item.price;
        return item;
    }

    static delete(name){
        const index = items.findIndex((i) => i.name === name);
        if (index === -1){
            throw new ExpressError('Item not found', 404)
        }
        const deletedItem = items.splice(index, 1)[0]
        return deletedItem;
    }
}

module.exports = Item;