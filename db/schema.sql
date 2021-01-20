-- Drop the database if it exists
DROP DATABASE IF EXISTS stocks_db;
-- Create the database
CREATE DATABASE stocks_db;
-- Use the database
USE stocks_db;
-- create a table 
CREATE TABLE stocks(
    id int auto_increment NOT NULL,
    value VARCHAR(255) NOT NULL,
    abbreviations VARCHAR (20) NOT NULL,
    stock VARCHAR(10) NOT NULL,
    price decimal(10,2) NOT NULL,
    percent change INT NOT NULL,
    primary key (id)
)