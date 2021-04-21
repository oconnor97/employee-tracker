const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'LunaWinter13',
    database: 'employeeDB',
});

connection.connect((err) => {
    if (err) throw err;
    beginPrompts();
});





const beginPrompts = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all departments',
                'View all roles',
                // 'View all employees by manager',
                'Add employee',
                'Add department',
                'Add role',
                // 'Remove employee',
                'Update employee role',
                // 'Update employee manager'
            ]
        })
        // Takes the user response and begins a new fucntion based on the input
        .then((answer) => {
            switch (answer.options) {
                case 'View all employees':
                    viewAllEmployees();
                    break;

                case 'View all departments':
                    console.log('this worked');
                    viewDepartments();
                    break;

                case 'View all roles':
                    console.log('this worked');
                    viewRoles();
                    break;

                // case 'View all employees by manager':
                //     console.log('this worked');
                //     beginPrompts();
                //     break;

                case 'Add employee':
                    addEmployee();
                    break;


                case 'Add department':
                    addDepartment()
                    break;



                case 'Add role':
                    addRole();
                    break;


                // case 'Remove employee':
                //     console.log('this worked');
                //     beginPrompts();
                //     break;


                case 'Update employee role':
                    updateEmployeeRole()
                    break;


                // case 'Update employee manager':
                //     console.log('this worked');
                //     beginPrompts();
                //     break;

            };

        });

};


const viewAllEmployees = () => {
    // View a list of all the employees along with their title salary and department
    connection.query('SELECT employee.first_name, employee.last_name, role.title, role.salary, department.department_name FROM employee JOIN role on role.id = employee.role_id JOIN department on department.id = role.department_id LEFT JOIN employee e on employee.manager_id = e.id;',
        (err, res) => {
            if (err) throw (err)
            console.table(res)
            beginPrompts();
        })
};

const viewDepartments = () => {
    // Returns a list of all departments
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw (err);
        console.table(res);
        beginPrompts()
    })
}



const viewRoles = () => {
    // Returns a list of all roles
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw (err);
        console.table(res);
        beginPrompts()
    })
};


const addEmployee = () => {
    // Creates a new employee row and then displays a new list of all employees
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the first name of the employee?'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name of the employee?'
            },
            {
                type: 'input',
                name: 'roleId',
                message: 'What is the employee role id?'
            },
            {
                type: 'input',
                name: 'managerId',
                message: 'What is the emploee manager id?'
            },
        ])
        .then((answer) => {
            connection.query('INSERT into employee SET ?', {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.managerId
            })
            console.log('Employee Added')
            viewAllEmployees()
        })
}


const addDepartment = () => {
    // Creates a new department then displays all departments
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the department you would like to add?'
            },

        ])
        .then((answer) => {
            connection.query('INSERT into department SET ?', {
                department_name: answer.departmentName,
            })
            console.log('Department Added')
            viewDepartments()
        })
}


const addRole = () => {
    // Allows the user to create a new role and add it to the database
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role you would like to add?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the starting salary of the role you are adding?'
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'What is the department id for the role you would like to add?'
            },

        ])
        .then((answer) => {
            connection.query('INSERT into role SET ?', {
                title: answer.roleName,
                salary: answer.salary,
                department_id: answer.departmentId
            })
            console.log('role Added')
            viewRoles()
        })
}

const updateEmployeeRole = () => {
    // Updates the employee role based on employee id and role id
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeId',
                message: 'What is the employee id number of the employee you would like to update?'
            },
            {
                type: 'input',
                name: 'newRole',
                message: 'What is the new role of the employee?'
            },

        ]).then((answer) => {
            connection.query('UPDATE employee SET ? WHERE?', [{
                role_id: answer.newRole
            },
            {
                id: answer.employeeId
            }
            ])
            console.log('Employee updated')
            viewAllEmployees()
        })
}