const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // getting specific user order (faking it for user 1)
    db.query(`SELECT * FROM orders;`)
    .then(data => {
      const orders = data.rows;
      res.json({ orders });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.get("/timestamp", (req, res) => {
    db.query(`
    SELECT CURRENT_TIMESTAMP + (20 * interval '1 minute') - CURRENT_TIMESTAMP
    FROM orders;
    `)
    .then(data => {
      const orders = data.rows;
      res.json({ orders });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  return router;
};
