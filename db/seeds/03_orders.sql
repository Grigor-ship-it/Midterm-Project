INSERT INTO orders (user_id, item_id, ordered_at, order_finished, order_status)
VALUES (1,1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + (20 * interval '1 minute'), true);
