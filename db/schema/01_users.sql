DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  telephone VARCHAR(35) NOT NULL,
  favourites BOOLEAN DEFAULT FALSE,
  allergens VARCHAR(255),
  payment_info INTEGER DEFAULT NULL,
  city VARCHAR(35),
  street VARCHAR(35),
  province VARCHAR(35),
  country VARCHAR(35),
  post_code VARCHAR(35)

);



