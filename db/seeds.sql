-- Seeded data to fill the db initially
INSERT INTO department (department_name)
Values  ("Sales"),
        ("Engineering"),
        ("HR"),
        ("Accounting");

INSERT INTO role (title, salary, department_id)
Values  ('Sales Lead', 90000.00, 1),
        ('Lead Engineer', 120000.00, 2),
        ('HR Manager', 70000.00, 3),
        ('Finance Manager', 90000.00, 4),
        ('Sales Associate', 50000.00, 1),
        ('Software Engineer', 85000.00, 2),
        ('Front Desk Clerk', 40000.00, 3),
        ('Accountant', 65000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Michael','Scott',1,NULL),
        ('Manny','Alvarez',2,NULL),
        ('Darth','Vader',3,NULL),
        ('Jerry','Jones',4,NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Mark','Bishop',6,2),
        ('Lindsay','Csonka',5,1),
        ('Bob','Johnson',8,4),
        ('Luke','Skywalker',7,3),
        ('Han','Solo',5,1),
        ('Chew','Baca',5,1),
        ('Jar Jar','Binks',8,4);