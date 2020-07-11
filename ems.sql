-- Deletes existing database named "departments_db"
DROP DATABASE IF EXISTS ems_db;
-- Creates new database named "departments_db"
CREATE DATABASE ems_db;
-- Uses newly created "departments_db"
USE ems_db;

CREATE TABLE department (
id INT(10) PRIMARY KEY NOT NULL,
deptName VARCHAR(30) NOT NULL
);

CREATE TABLE employee_role (
id INT(10) PRIMARY KEY NOT NULL,
title VARCHAR(30) NOT NULL, 
salary DECIMAL, 
deptID INT(10)
);

CREATE TABLE employee (
id INT(10) PRIMARY KEY NOT NULL,
first_name VARCHAR(30) NOT NULL, 
last_name VARCHAR(30) NOT NULL, 
role_id INT(10), 
manager_id INT(10)
);