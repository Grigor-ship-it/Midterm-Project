const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // getting specific user order (faking it for user 1)
    db.query(`
    SELECT *
    FROM orders
    JOIN menu_items ON menu_items.id = item_id
    WHERE user_id = 1;
    `)
      .then(data => {
        const orders = data.rows[0];
        console.log(orders);
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
