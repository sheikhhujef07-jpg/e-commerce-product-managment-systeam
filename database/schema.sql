CREATE DATABASE IF NOT EXISTS ecommerce_product;
USE ecommerce_product;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  image VARCHAR(500) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, category, stock, image)
SELECT 'Wireless Headphones', 'Comfortable wireless headphones for everyday use.', 1499.00, 'Electronics', 20, ''
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Wireless Headphones');

INSERT INTO products (name, description, price, category, stock, image)
SELECT 'Smart Watch', 'Smart watch with useful daily activity features.', 2299.00, 'Electronics', 15, ''
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Smart Watch');

INSERT INTO products (name, description, price, category, stock, image)
SELECT 'Backpack', 'Simple and durable backpack for daily use.', 899.00, 'Accessories', 25, ''
WHERE NOT EXISTS (SELECT 1 FROM products WHERE name = 'Backpack');
