const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const path = require('path');

router.post('/', (req, res) => {
  const { dbName, query } = req.body;
  const dbPath = path.resolve(__dirname, `../db/${dbName}.db`);

  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) return res.status(500).json({ error: "DB Connection Failed" });
  });

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ results: rows });
  });

  db.close();
});

module.exports = router;
