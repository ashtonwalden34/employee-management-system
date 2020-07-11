-- uses employee management system database
USE ems_db;
-- Inserts dummy data into 'department' table
INSERT INTO department (deptName)
VALUES ("test_1");

INSERT INTO department (deptName)
VALUES ("test_2");

INSERT INTO department (deptName)
VALUES ("test_3");

INSERT INTO department (deptName)
VALUES ("test_4");

INSERT INTO department (deptName)
VALUES ("test_5");

-- Inserts dummy data into 'employee' table
INSERT INTO employee_role (title, salary)
VALUES ("test_1_lead", 100000.00);

INSERT INTO employee_role (title, salary)
VALUES ("test_1_employee", 50000.00);

INSERT INTO employee_role (title, salary)
VALUES ("test_2_employee", 45000.00);