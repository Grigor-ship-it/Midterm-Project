const { response } = require('express');
const express = require('express');
const router  = express.Router();
const sendSMSnotification = require("../send_sms")

module.exports = (db) => {
  router.post("/", (req, res) => {
    db.query(`
    INSERT INTO orders (ordered_at, order_finished, order_status)
      VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + (20 * interval '1 minute'), true);

    `)
    .then(data => {
      console.log("finalized")
      console.log(data);
      res.status(201).json({message: "final order"})
    })
    .then(data => {sendSMSnotification()})

    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    })



  });
  return router;
};
