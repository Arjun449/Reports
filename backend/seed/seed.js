// backend/seed/seed.js
const mongoose = require('mongoose');
const Inventory = require('../models/inventory');

mongoose.connect('mongodb://localhost:27017/inventory', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const seedData = async () => {
    await Inventory.deleteMany({}); // Clear existing data
    await Inventory.create({ name: 'Product A', quantity: 50 });
    await Inventory.create({ name: 'Product B', quantity: 5 });
    console.log('Database seeded!');
    mongoose.connection.close();
};

seedData().catch(error => {
    console.error('Error seeding data:', error);
    mongoose.connection.close();
});
