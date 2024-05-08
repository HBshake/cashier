INSERT INTO access_token (name)
VALUES ('dev');
INSERT INTO account (username, display_name, pass_hash, perms)
VALUES (
    'dev',
    'Dev Account',
    '$2b$12$XqFDLWjJwvpAOncz2F7oU.b7ER8pxkIY/toGlgCsCaX/JG9Ofg.Wi',
    ARRAY ['ADMIN']
  );
INSERT INTO customer (id, name)
VALUES (1, 'Customer 1'),
  (2, 'Customer 2'),
  (3, 'Customer 3');
INSERT INTO employee (id, name)
VALUES (1, 'Employee 1'),
  (2, 'Employee 2'),
  (3, 'Employee 3');
INSERT INTO product (id, name, barcode, price)
VALUES (1, 'Product 1', '1234567890123', 100),
  (2, 'Product 2', '1234567890124', 200),
  (3, 'Product 3', '1234567890125', 300);
INSERT INTO raw_material (id, name, unit_price, unit_name)
VALUES (1, 'Raw Material 1', 10, 'kg'),
  (2, 'Raw Material 2', 20, 'kg'),
  (3, 'Raw Material 3', 30, 'L');
INSERT INTO raw_material_in_product (raw_material_id, product_id, quantity_per_unit)
VALUES (1, 1, 1),
  (2, 1, 2.5),
  (1, 2, 1),
  (3, 2, 3),
  (1, 3, 1),
  (2, 3, 2),
  (3, 3, 3);
INSERT INTO shop (id, name)
VALUES (1, 'Shop 1'),
  (2, 'Shop 2'),
  (3, 'Shop 3');
INSERT INTO raw_material_in_shop (raw_material_id, shop_id, stock)
VALUES (1, 1, 100),
  (2, 1, 200),
  (3, 1, 300),
  (1, 2, 100),
  (2, 2, 200),
  (3, 2, 300),
  (1, 3, 100),
  (2, 3, 200),
  (3, 3, 300);
INSERT INTO product_in_shop (product_id, shop_id, stock)
VALUES (1, 1, 100),
  (2, 1, 200),
  (3, 1, 300),
  (1, 2, 100),
  (2, 2, 200),
  (3, 2, 300),
  (1, 3, 100),
  (2, 3, 200),
  (3, 3, 300);
INSERT INTO transaction (id, ttype, tax_percent, total_price, paid)
VALUES (1, 'InStore', 0.1, 1000, 100),
  (2, 'InStore', 0.1, 2000, 200),
  (3, 'Delivery', 0.1, 3000, 300);
INSERT INTO product_in_transaction (product_id, transaction_id, name, unit_price, count, total_price)
VALUES (1, 1, 'Product 1', 100, 10, 1000),
  (2, 1, 'Product 2', 200, 10, 2000),
  (3, 1, 'Product 3', 300, 10, 3000),
  (1, 2, 'Product 1', 100, 10, 1000),
  (2, 2, 'Product 2', 200, 10, 2000),
  (3, 2, 'Product 3', 300, 10, 3000),
  (1, 3, 'Product 1', 100, 10, 1000),
  (2, 3, 'Product 2', 200, 10, 2000),
  (3, 3, 'Product 3', 300, 10, 3000);