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
    SELECT ordered_at as order_time, order_finished as finish_time
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

  router.get("/cart", (req, res) => {
    // getting specific user order (faking it for user 1)
    db.query(`
    SELECT * FROM orders
    JOIN user_orders ON user_orders.id = user_orders_id
    JOIN menu_items ON user_orders.item_id = menu_items.id
    `)
    // JOIN items ON menu_items.id = menu_item_id;
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

  router.get("/cart/:id", (req, res) => {
    // getting specific user order (faking it for user 1)
    db.query(`
    SELECT * FROM user_orders
    JOIN menu_items ON user_orders.item_id = menu_items.id
    WHERE menu_items.id = $1
    `, [req.params.id])
    // JOIN items ON menu_items.id = menu_item_id;
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
