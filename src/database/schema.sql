CREATE DATABASE pets;

CREATE EXTENSION IF NOT EXISTS "uuid-v4";

CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    email varchar,
    password varchar,
);
