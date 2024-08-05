// backend/seed/seed.js
const mongoose = require('mongoose');
const Inventory = require('../models/inventory'); // Correct path

mongoose.connect('mongodb://localhost:27017/inventoryDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    return seedData();
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

const seedData = async () => {
    await Inventory.create({ name: 'Product A', quantity: 50 });
    await Inventory.create({ name: 'Product B', quantity: 5 });
    console.log('Data seeded');
    mongoose.connection.close();
};
