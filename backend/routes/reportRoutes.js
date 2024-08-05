// backend/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/inventory/pdf', (req, res) => {
    const filePath = path.resolve(__dirname, 'inventory_report.pdf');
    res.sendFile(filePath);
});

module.exports = router;
