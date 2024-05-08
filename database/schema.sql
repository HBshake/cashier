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

CREATE TABLE raw_materials_in_shop (
    raw_material_id SERIAL REFERENCES raw_material (id),
    shop_id SERIAL REFERENCES shop (id),
    stock DOUBLE PRECISION NOT NULL,
    PRIMARY KEY (raw_material_id, shop_id)
);

CREATE TABLE products_in_shop (
    product_id SERIAL REFERENCES product (id),
    shop_id SERIAL REFERENCES shop (id),
    stock INTEGER NOT NULL, 
    PRIMARY KEY (shop_id, product_id)
);

CREATE TABLE transaction (
    id SERIAL PRIMARY KEY,
    trans_type INTEGER NOT NULL,
    tax_percent DOUBLE PRECISION NOT NULL, 
    total_price DOUBLE PRECISION NOT NULL, 
    paid DOUBLE PRECISION, 
    created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by TEXT NOT NULL    
);

// should remove that ENUM