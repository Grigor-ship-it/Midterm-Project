DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders(
  id SERIAL PRIMARY KEY NOT NULL,
  user_order_id INTEGER REFERENCES user_order(id) ON DELETE CASCADE,
  ordered_at TIMESTAMP,
  order_finished TIMESTAMP,
  order_status BOOLEAN DEFAULT FALSE

);
