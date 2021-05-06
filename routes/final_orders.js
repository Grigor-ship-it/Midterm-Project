const { response } = require('express');
const express = require('express');
const router  = express.Router();
const sendSMSNotification = require('../public/scripts/send_sms')

module.exports = (db) => {
  router.post("/", (req, res) => {
    db.query(`
    INSERT INTO orders (ordered_at, order_finished, order_status)
      VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + (20 * interval '1 minute'), true);

    `)
    .then(data => res.status(201).json({message: "final order"}))
    .then(sendSMSNotification())
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });


  });
  return router;
};
