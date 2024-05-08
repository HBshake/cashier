CREATE TABLE customer (
    id SERIAL NOT NULL PRIMARY KEY,
    name text NOT NULL,
    ice text,
    rc text,
    delivery_address text,
    phone text,
    comment text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
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

CREATE TABLE raw_materials_in_product (
    raw_material_id SERIAL REFERENCES raw_material (id),
    product_id SERIAL REFERENCES product (id),
    quantity_per_unit DOUBLE PRECISION NOT NULL,
	PRIMARY KEY (raw_material_id, product_id)
);
CREATE TABLE account (
    username TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    pass_hash TEXT NOT NULL,
    perms TEXT[] NOT NULL,
    created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE access_token (
    name TEXT PRIMARY KEY,
    created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE session (
    id TEXT PRIMARY KEY,
    account_username TEXT REFERENCES account(username),
    login_time TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    logout_time TIMESTAMP(3) WITHOUT TIME ZONE
);