"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
//Initialize an empty inventory system;
const inventory = [];
//Return the index.html file
app.get('/', function (req, res) {
    res.send('Hello World!');
});
//List all inventory items
app.get('/inventory', function (req, res) {
    res.send(inventory);
});
//Create a new inventory item
app.post('/inventory', function (req, res) {
    const newItem = req.body;
    newItem.id = generateId();
    inventory.push(newItem);
    res.send(newItem);
});
//Update an existing inventory item
app.put('/inventory/:id', function (req, res) {
    const id = req.params.id;
    const currentItem = inventory.find(item => item.id === id);
    const updatedItem = req.body;
    if (currentItem != null) {
        Object.assign(currentItem, updatedItem);
        res.send(currentItem);
    }
    else {
        res.status(404).send('Item with id ' + id + 'not found');
    }
});
//Delete and return an inventory item
app.delete('/inventory/:id', function (req, res) {
    const id = req.params.id;
    const currentItem = inventory.find(item => item.id === id);
    if (currentItem != null) {
        inventory.splice(inventory.indexOf(currentItem), 1);
        res.send(currentItem);
    }
    else {
        res.status(404).send('Item with id ' + id + 'not found');
    }
});
//Serve the app on port 8080
app.listen(8080);
function generateId() {
    return (0, uuid_1.v4)();
}
