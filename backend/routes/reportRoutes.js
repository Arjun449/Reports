// backend/routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');
const Inventory = require('../models/inventory');

router.get('/inventory/pdf', async (req, res) => {
    try {
        const items = await Inventory.find({});

        const doc = new PDFDocument();
        let buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            let pdfData = Buffer.concat(buffers);
            res
                .writeHead(200, {
                    'Content-Length': Buffer.byteLength(pdfData),
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': 'attachment;filename=inventory_report.pdf',
                })
                .end(pdfData);
        });

        doc.fontSize(25).text('Inventory Report', {
            align: 'center',
        });

        doc.moveDown();
        items.forEach(item => {
            doc.fontSize(12).text(`Name: ${item.name}, Quantity: ${item.quantity}`);
            doc.moveDown();
        });

        doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

module.exports = router;


