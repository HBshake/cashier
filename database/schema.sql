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