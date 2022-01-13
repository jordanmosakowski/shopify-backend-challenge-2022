import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const app = express();

//Initialize an empty inventory system;
const inventory: Item[] = [];

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
    const newItem: Item = req.body;
    newItem.id = generateId();
    inventory.push(newItem);
    res.send(newItem);
});

//Update an existing inventory item
app.put('/inventory/:id', function (req, res) {
    const id: string = req.params.id;
    const currentItem: Item | undefined = inventory.find(item => item.id === id);
    const updatedItem: Item = req.body;
    if (currentItem!=null){
        Object.assign(currentItem, updatedItem);
        res.send(currentItem);
    } 
    else{
        res.status(404).send('Item with id '+id+'not found');
    }
});

//Delete and return an inventory item
app.delete('/inventory/:id', function (req, res) {
    const id: string = req.params.id;
    const currentItem: Item | undefined = inventory.find(item => item.id === id);
    if (currentItem!=null) {
        inventory.splice(inventory.indexOf(currentItem), 1);
        res.send(currentItem);
    }
    else{
        res.status(404).send('Item with id '+id+'not found');
    }
});

//Serve the app on port 8080
app.listen(8080);

interface Item{
    id: string;
    name: string;
    description: string;
    quantity: number;
}

function generateId(): string {
    return uuidv4();
}