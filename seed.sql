-- uses employee management system database
USE ems_db;
-- Inserts dummy data into 'department' table
INSERT INTO department (deptName)
VALUES ("test_1"), ("test_2"), ("test_3");

-- Inserts dummy data into 'employee_role' table
INSERT INTO employee_role (title, salary, deptID)
VALUES ("test_1_lead", 100000.00, 1), ("test_1_employee", 50000.00, 2), ("test_2_employee", 45000.00, 3);

-- Inserts dummy data into 'employee table'
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Test", "Testerson", 1), ("John", "Testerson", 2, 1), ("Bayley", "Testerson", 3, 1);