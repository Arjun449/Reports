// backend/server.js
const express = require('express');
const cors = require('cors');
const reportRoutes = require('./routes/reportRoutes');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(cors());
app.use('/api/reports', reportRoutes);

mongoose.connect('mongodb://localhost:27017/inventoryDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
