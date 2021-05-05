const { response } = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {

    db.query(`
    INSERT INTO order_items (order_id, item_id, quantity, item_sum_price)
    VALUES (2, ${req.body.item_id}, ${req.body.quantity}, ${req.body.item_price * req.body.quantity})

    `)
    .then(data => {
      console.log("finalized");
      // console.log(data);
      res.status(201).json({message: "final order"})
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });


  });
  return router;
};
