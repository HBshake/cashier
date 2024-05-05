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
CREATE TYPE account_permission AS ENUM (
    'ADMIN',
    'READ_PRODUCTS',
    'READ_RAWMAT',
    'READ_LOCATIONS',
    'READ_CASHIERS',
    'READ_STOCK',
    'READ_CUSTOMERS',
    'ADD_PRODUCTS',
    'ADD_RAWMAT',
    'ADD_LOCATION',
    'ADD_CASHIERS',
    'ADD_CUSTOMERS',
    'MOD_PRODUCTS',
    'MOD_RAWMAT',
    'MOD_LOCATION',
    'MOD_CASHIERS',
    'MOD_STOCK',
    'MOD_CUSTOMER',
    'REM_PRODUCTS',
    'REM_RAWMAT',
    'REM_LOCATION',
    'REM_CASHIERS',
    'REM_CUSTOMERS',
    'READ_TRANSACT_HIST',
    'READ_INVOICE',
    'GEN_INVOICE'
);
CREATE TABLE account (
    username TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    pass_hash TEXT NOT NULL,
    perms account_permission [],
    created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE TABLE access_token (
    name TEXT PRIMARY KEY,
    created_at TIMESTAMP(3) WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);