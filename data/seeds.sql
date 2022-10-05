-- static values for population of the database
INSERT INTO departments (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Vince', 'Toon', 1, NULL),
('Taylor', 'Cruz', 2, 1),
('Holly', 'Sandwich', 3, NULL),
('Sam', 'Clark', 4, 3),
('Ryan', 'Smith', 5, NULL),
('Abbey', 'Holdener', 6, 5),
('Madison', 'Assaid', 7, NULL),
('Tony', 'Numi', 8, 7);