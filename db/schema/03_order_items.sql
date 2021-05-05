DROP TABLE IF EXISTS order_items CASCADE;
CREATE TABLE order_items(
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 0,
  item_sum_price INTEGER DEFAULT 0

);