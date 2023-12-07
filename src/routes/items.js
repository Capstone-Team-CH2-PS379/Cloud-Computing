const express = require('express');
const router = express.Router();
const db = require('../config/db');

// // Create item
// router.post('/item', async (req, res) => {
//     try {
//         const { name } = req.body;
//         const [result] = await db.execute('INSERT INTO items (name) VALUES (?)', [name]);
//         res.status(201).json({ id: result.insertId, name });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

// Read all items
router.get('/items', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM category_situation');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

// // Update item
// router.put('/item/:id', async (req, res) => {
//     try {
//         const { name } = req.body;
//         const { id } = req.params;
//         await db.execute('UPDATE items SET name = ? WHERE id = ?', [name, id]);
//         res.send('Item updated');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

// // Delete item
// router.delete('/item/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         await db.execute('DELETE FROM items WHERE id = ?', [id]);
//         res.send('Item deleted');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server error');
//     }
// });

module.exports = router;
