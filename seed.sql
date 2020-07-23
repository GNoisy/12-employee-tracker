USE employeeTracker_DB;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000.00, 10), ("Salesperson", 80000.00, 10), ("Lead Engineer", 150000.00, 05), ("Software Engineer", 120000.00, 05), ("Accountant", 125000.00, 15), ("Legal Team Lead", 250000.00, 20), ("Lawyer", 190000.00, 20);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 30, 1), ("Mike", "Chan", 31, 2), ("Ashley", "Rodriguez", 32, 9), ("Kevin", "Tupik", 33, 3), ("Malia", "Brown", 34, 8), ("Sarah", "Lourd", 35, 7), ("Tom", "Allen", 36, 4);