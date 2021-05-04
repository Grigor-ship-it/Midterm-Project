const { response } = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.post("/", (req, res) => {

    db.query(`

    `)
    .then(data => {
      console.log("finalized")

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
