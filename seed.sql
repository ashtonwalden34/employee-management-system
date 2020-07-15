-- uses employee management system database
USE ems_db;
-- Inserts dummy data into 'department' table
INSERT INTO department (dept_name)
VALUES ("dept_1"), ("dept_2"), ("dept_3");

-- Inserts dummy data into 'employee_role' table
INSERT INTO employee_role (title, salary, dept_id)
VALUES ("role_1", 100000.00, 1), ("role_2", 50000.00, 2), ("role_3", 45000.00, 3);

-- Inserts dummy data into 'employee table'
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Test", "Testerson", 1, 2), ("John", "Testerson", 2, 1), ("Bayley", "Testerson", 3, 1);