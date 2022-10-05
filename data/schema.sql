-- drops database if it exists for creation of new predetermined database
DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;
-- uses the employee_tracker database
USE employee_tracker;

-- drops these tables in employee_tracker database
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

-- creates department table and assign characteristics
CREATE TABLE departments (
    department_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
);

-- creates roles table and assign characteristics
CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    -- foreign key constraint to insert departments id into the roles
    CONSTRAINT fk_deptartments FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE CASCADE
);

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    -- foreign key constraint to accept the roles id into employees
    CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
    -- foreign key for manager to accept employee id info
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);