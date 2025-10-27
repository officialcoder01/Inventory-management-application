#! /usr/bin/env node

const { Client } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || 'postgresql://raven:raven123@db:5432/inventory_db';

const SQL = `
CREATE TABLE IF NOT EXISTS suppliers (
    supplier_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    description TEXT,
    supplier_id INTEGER,
    CONSTRAINT fk_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS parts (
    part_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255),
    description TEXT,
    price NUMERIC(10, 2),
    quantity INTEGER,
    category_id INTEGER,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
);`;

const main = async () => {
    console.log("seeding...");
    const client = new Client({ 
        connectionString,
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    });

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();