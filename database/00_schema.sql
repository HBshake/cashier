CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    ice TEXT,
    rc TEXT,
    delivery_address TEXT,
    phone TEXT,
    comment TEXT,
    created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE raw_material (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    unit_price DOUBLE PRECISION NOT NULL,
    unit_name TEXT,
    created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    barcode TEXT,
    price DOUBLE PRECISION NOT NULL,
    created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE raw_material_in_product (
    raw_material_id SERIAL REFERENCES raw_material (id),
    product_id SERIAL REFERENCES product (id),
    quantity_per_unit DOUBLE PRECISION NOT NULL,
    PRIMARY KEY (raw_material_id, product_id)
);
CREATE TABLE shop (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE raw_material_in_shop (
    raw_material_id SERIAL REFERENCES raw_material (id),
    shop_id SERIAL REFERENCES shop (id),
    stock DOUBLE PRECISION NOT NULL,
    PRIMARY KEY (raw_material_id, shop_id)
);
CREATE TABLE product_in_shop (
    product_id SERIAL REFERENCES product (id),
    shop_id SERIAL REFERENCES shop (id),
    stock INTEGER NOT NULL,
    PRIMARY KEY (shop_id, product_id)
);
-- Transaction
CREATE TABLE transaction (
    id SERIAL PRIMARY KEY,
    ttype TEXT NOT NULL,
    tax_percent DOUBLE PRECISION NOT NULL,
    total_price DOUBLE PRECISION NOT NULL,
    paid DOUBLE PRECISION,
    created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE invoice (
    id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL,
    blob BYTEA NOT NULL,
    created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    transaction_id INT NOT NULL REFERENCES transaction (id)
);
CREATE TABLE product_in_transaction (
    product_id SERIAL REFERENCES product (id),
    transaction_id SERIAL REFERENCES transaction (id),
    name TEXT NOT NULL,
    unit_price DOUBLE PRECISION NOT NULL,
    count INTEGER NOT NULL,
    total_price DOUBLE PRECISION NOT NULL,
    PRIMARY KEY (product_id, transaction_id)
);
-- Auth
CREATE TABLE account (
    username TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    pass_hash TEXT NOT NULL,
    perms TEXT [] NOT NULL,
    created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE access_token (
    name TEXT PRIMARY KEY,
    created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE session (
    id TEXT PRIMARY KEY,
    account_username TEXT REFERENCES account(username) NOT NULL,
    login_time TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    logout_time TIMESTAMP(3) WITHOUT TIME ZONE
);