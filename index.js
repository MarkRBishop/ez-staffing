const inquirer = require('inquirer')
const db = require('./db/connection')

function appStart () {
    inquirer
        .prompt([
            {
                type: 'list',
                name:'action',
                messsage: 'What would you like to do?',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role'
                ]
            }
        ])
        .then((answers) => {
            switch (answers.action) {
                case 'View all departments':
                    viewAllDepartments()
                    break;
                case 'View all roles':
                    viewAllRoles()
                    break;
                case 'View all employees':
                    viewAllEmployees()
                    break;
                case 'Add a department':
                    addDepartment()
                    break
                case 'Add a role':
                    addRole()
                    break
                case 'Add an employee':
                    addEmployee()
                    break
                case 'Update an employee role':
                    updateEmployee()
                    break
            }
        })
}

function viewAllDepartments(){
    const query = 'SELECT * FROM department';

    db.query(query, (err, results) => {
        if (err) throw err

        console.table(results)
        appStart()
    })
}

function viewAllRoles(){
    const query = 'SELECT * FROM role';

    db.query(query, (err, results) => {
        if (err) throw err

        console.table(results)
        appStart()
    })
}

function viewAllEmployees (){
    const query = 'SELECT * FROM employee';

    db.query(query, (err, results) => {
        if (err) throw err

        console.table(results)
        appStart()
    })
}

function addDepartment(){
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                messsage: 'Enter the name of the new department:',
                validate: (input) => {
                    if (input.trim() === ''){
                        return 'Please enter a valid department name'
                    }
                    return true;
                }
            }
        ])
        .then ((answers) => {
            const query = 'INSERT INTO department (department_name) VALUES (?)';
            const values = [answers.departmentName]

            db.query(query, values, (err) => {
                if (err) throw err

                console.log(`Department '${answers.departmentName}' added successfully!\n`)

                appStart()
            })
        })
}

function addRole(){
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            messsage: 'Enter the title of the new role:',
            validate: (input) => {
                if (input.trim() === ''){
                    return 'Please enter a valid role title'
                }
                return true;
            }
        },
        {
            type: 'number',
            name: 'salary',
            messsage: 'Enter the salary for the new role:',
            validate: (input) => {
                if (isNaN(input) || input <= 0) {
                    return 'Please enter a valid salary.'
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'departmentID',
            message: 'Enter the department ID for the new role:',
            validate: (input) => {
                if (isNaN(input) || input <=0) {
                    return 'Please enter a valid department ID.'
                }
                return true
            }
        }
    ])
    .then ((answers) => {
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        const values = [answers.title, answers.salary, answers.departmentID]

        db.query(query, values, (err) => {
            if (err) throw err

            console.log(`Role '${answers.title}' added successfully!\n`)

            appStart()
        })
    })
}

function addEmployee(){
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: "Enter the new employee's first name.",
                validate: (input) => {
                    if(input.trim() === '') {
                        return 'Please enter a valid first name.'
                    }
                    return true
                }
            },
            {
                type: 'input',
                name: 'lastName',
                message: "Enter the new employee's last name.",
                validate: (input) => {
                    if(input.trim() === '') {
                        return 'Please enter a valid last name.'
                    }
                    return true
                }
            },
            {
                type: 'input',
                name: 'roleID',
                message: "Enter the role ID for the new Employee:",
                validate: (input) => {
                    if (isNaN(input) || input <=0) {
                        return 'Please enter a valid role ID.'
                    }
                    return true
                }
            },
            {
                type: 'input',
                name: 'managerID',
                message: "Enter the manager's ID for the new Employee (optional):",
                validate: (input) => {
                    if (isNaN(input) || input <=0) {
                        return 'Please enter a valid manager ID or leave it blank.'
                    }
                    return true
                }
            }
        ])
        .then((answers) => {
            const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)'
            const values = [answers.firstName, answers.lastName, answers.roleID, answers.managerID || null]

            db.query(query, values, (err) => {
                if (err) throw err

                console.log(`Employee '${answers.firstName} ${answers.lastName}' added successfully.\n`)

                appStart()
            })
        })
}

function updateEmployee(){
// Fetch the list of employees and roles from the database
const employeeQuery = 'SELECT id, CONCAT(first_name, " ", last_name) AS full_name FROM employee';
const roleQuery = 'SELECT id, title FROM role';

//I got some help from xpert learning when writing this promise
Promise.all([db.promise().query(employeeQuery), db.promise().query(roleQuery)])
  .then(([employeeResults, roleResults]) => {
    const employees = employeeResults[0];
    const roles = roleResults[0];

    // Prompt user to select an employee from the list
    return inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select the employee whose role you want to update:',
        choices: employees.map((employee) => ({ value: employee.id, name: employee.full_name })),
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the new role for the employee:',
        choices: roles.map((role) => ({ value: role.id, name: role.title })),
      },
    ]);
  })
  .then((answers) => {
    // Update the employee's role in the database
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    const values = [answers.roleId, answers.employeeId];

    return db.promise().query(query, values);
  })
  // After updating, return to the main menu
  .then(() => {
    console.log('Employee\'s role updated successfully!\n');
    appStart(); 
  })
  // Handle errors and return to the main menu
  .catch((err) => {
    console.error('Error updating employee\'s role:', err);
    appStart(); 
  });
}

appStart()