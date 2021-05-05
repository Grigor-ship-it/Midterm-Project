INSERT INTO orders (ordered_at, order_finished, order_status)
VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + (20 * interval '1 minute'), true);
