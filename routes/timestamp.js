const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`
    SELECT TO_CHAR(CURRENT_TIMESTAMP + (20 * interval '1 minute'), 'HH:MI:SS'), TO_CHAR(ordered_at, 'HH:MI:SS') as now
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
