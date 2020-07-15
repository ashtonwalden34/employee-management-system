-- Deletes existing database named "departments_db"
DROP DATABASE IF EXISTS ems_db;
-- Creates new database named "departments_db"
CREATE DATABASE ems_db;
-- Uses newly created "departments_db"
USE ems_db;

-- creates table to hold departments
CREATE TABLE department (
    -- auto increments an id for each department
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    -- column to hold the name of the department
    deptName VARCHAR(30) NOT NULL
);

CREATE TABLE employee_role (
    -- auto increments id for each role
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    -- column to hold title of role
    title VARCHAR(30) NOT NULL,
    -- column to hold salary for role
    salary DECIMAL, 
    -- corresponds to department id
    deptID INT(10)
);

CREATE TABLE employee (
    -- auto increments id for each employee
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    -- column to hold employee first name
    first_name VARCHAR(30) NOT NULL,
    -- column to hold employee last name
    last_name VARCHAR(30) NOT NULL,
    -- corresponds to the role id
    role_id INT(10),
    -- holds employee id of this employee's manager
    manager_id INT(10)
);

SELECT * FROM department;
SELECT * FROM employee_role;
SELECT * FROM employee;