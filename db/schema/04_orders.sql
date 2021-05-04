DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders(
  id SERIAL PRIMARY KEY NOT NULL,
  user_orders_id INTEGER REFERENCES user_orders(id) ON DELETE CASCADE,
  ordered_at TIMESTAMP,
  order_finished TIMESTAMP,
  order_status BOOLEAN DEFAULT FALSE

);
