const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // getting specific user order (faking it for user 1)
    db.query(`SELECT * FROM order_items;`)
    .then(data => {
      const order_items = data.rows;
      res.json({ order_items });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};
