INSERT INTO customer (id, name)
VALUES (10000, 'Customer 1'),
  (10001, 'Customer 2'),
  (10002, 'Customer 3');
INSERT INTO employee (id, name)
VALUES (10000, 'Employee 1'),
  (10001, 'Employee 2'),
  (10002, 'Employee 3');
INSERT INTO product (id, name, barcode, price)
VALUES (10000, 'Product 1', '1234567890123', 100),
  (10001, 'Product 2', '1234567890124', 200),
  (10002, 'Product 3', '1234567890125', 300);
INSERT INTO raw_material (id, name, unit_price, unit_name)
VALUES (10000, 'Raw Material 1', 10, 'kg'),
  (10001, 'Raw Material 2', 20, 'kg'),
  (10002, 'Raw Material 3', 30, 'L');
INSERT INTO raw_material_in_product (raw_material_id, product_id, quantity_per_unit)
VALUES (10000, 10000, 1),
  (10001, 10000, 2.5),
  (10000, 10001, 1),
  (10002, 10001, 3),
  (10000, 10002, 1),
  (10001, 10002, 2),
  (10002, 10002, 3);
INSERT INTO shop (id, name)
VALUES (10000, 'Shop 1'),
  (10001, 'Shop 2'),
  (10002, 'Shop 3');
INSERT INTO raw_material_in_shop (raw_material_id, shop_id, stock)
VALUES (10000, 10000, 100),
  (10001, 10000, 200),
  (10002, 10000, 300),
  (10000, 10001, 100),
  (10001, 10001, 200),
  (10002, 10001, 300),
  (10000, 10002, 100),
  (10001, 10002, 200),
  (10002, 10002, 300);
INSERT INTO product_in_shop (product_id, shop_id, stock)
VALUES (10000, 10000, 100),
  (10001, 10000, 200),
  (10002, 10000, 300),
  (10000, 10001, 100),
  (10001, 10001, 200),
  (10002, 10001, 300),
  (10000, 10002, 100),
  (10001, 10002, 200),
  (10002, 10002, 300);
INSERT INTO transaction (id, ttype, tax_percent, total_price, paid)
VALUES (10000, 'InStore', 0.1, 1000, 100),
  (10001, 'InStore', 0.1, 2000, 200),
  (10002, 'Delivery', 0.1, 3000, 300);
INSERT INTO product_in_transaction (product_id, transaction_id, name, unit_price, count, total_price)
VALUES (10000, 10000, 'Product 1', 100, 1, 100),
  (10001, 10000, 'Product 2', 200, 1, 200),
  (10002, 10000, 'Product 3', 300, 1, 300),
  (10000, 10001, 'Product 1', 100, 2, 200),
  (10001, 10001, 'Product 2', 200, 2, 400),
  (10002, 10001, 'Product 3', 300, 2, 600),
  (10000, 10002, 'Product 1', 100, 3, 300),
  (10001, 10002, 'Product 2', 200, 3, 600),
  (10002, 10002, 'Product 3', 300, 3, 900);

INSERT INTO account (username, display_name, pass_hash, perms)
VALUES (
    'dev',
    'Dev Account',
    '$2b$12$XqFDLWjJwvpAOncz2F7oU.b7ER8pxkIY/toGlgCsCaX/JG9Ofg.Wi',
    ARRAY ['ADMIN']
  );
INSERT INTO access_token (name)
VALUES ('dev');