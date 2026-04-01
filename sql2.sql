CREATE DATABASE IF NOT EXISTS assignment3_app5;
USE assignment3_app5;

CREATE TABLE IF NOT EXISTS restaurants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  cuisine VARCHAR(80) NOT NULL,
  rating DECIMAL(2,1) NOT NULL
);

INSERT INTO restaurants (name, cuisine, rating) VALUES
('Spice Route', 'Pakistani', 4.8),
('Roma Bites', 'Italian', 4.5),
('Dragon Bowl', 'Chinese', 4.6),
('Burger Street', 'Fast Food', 4.2);
