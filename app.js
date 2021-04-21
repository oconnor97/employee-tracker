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
                    console.log('this worked');
                    beginPrompts();
                    break;



                case 'Add role':
                    console.log('this worked');
                    beginPrompts();
                    break;


                // case 'Remove employee':
                //     console.log('this worked');
                //     beginPrompts();
                //     break;


                case 'Update employee role':
                    console.log('this worked');
                    beginPrompts();
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