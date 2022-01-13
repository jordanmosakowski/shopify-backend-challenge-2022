"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const path = __importStar(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//Initialize an empty inventory system;
const inventory = [];
//Return the index.html file
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
//List all inventory items
app.get('/inventory', function (req, res) {
    res.send(inventory);
});
//Create a new inventory item
app.post('/inventory', function (req, res) {
    const newItem = req.body;
    //Generate an ID for the new item
    newItem.id = (0, uuid_1.v4)();
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
app.get("/exportcsv", function (req, res) {
    let csv = inventory.map(item => `${item.id},${item.name},${item.description},${item.quantity}`).join("\n");
    csv = "id,name,description,quantity\n" + csv;
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=inventory.csv');
    res.send(csv);
});
//Serve the app on port 8080
app.listen(8080);
