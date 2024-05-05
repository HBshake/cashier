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
