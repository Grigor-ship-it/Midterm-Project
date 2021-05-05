const { response } = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {

    db.query(`INSERT INTO users (name, email, password, telephone, payment_info, allergens) VALUES ('${req.body.name}', '${req.body.email}', '${req.body.password}', '${req.body.telephone}', '${req.body.paymentInfo}','${req.body.allergens}');`)
    .then(data => {
      console.log("User Registered")
      res.status(201).json({message: "User created"})
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
};
