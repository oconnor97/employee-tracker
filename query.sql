--Created in SQLWorkbench then copied over--
DROP DATABASE IF EXISTS employeeDB;

CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT KEY,
title VARCHAR(30),
salary DECIMAL,
department_id INT,
-- FOREIGN KEY (department_id) REFERENCES department(id)

);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT,
-- FOREIGN KEY (role_id) REFERENCES role(id),
-- FOREIGN KEY (manager_id) REFERENCES employee(id)


);