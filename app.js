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

// const departmentChoices = ['Sales', 'Marketing', 'Engineering', 'Finance', 'Legal']



const beginPrompts = () => {
    inquirer
        .prompt({
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all employees by department',
                'View all roles',
                'View all employees by manager',
                'Add employee',
                'Add department',
                'Add role',
                'Remove employee',
                'Update employee role',
                'Update employee manager'
            ]
        })
        // Takes the user response and begins a new fucntion based on the input
        .then((answer) => {
            switch (answer.options) {
                case 'View all employees':
                    viewAllEmployees();
                    break;

                case 'View all departmentts':
                    console.log('this worked');
                    viewByDepartment();
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
                    console.log('this worked');
                    beginPrompts();
                    break;

                case 'Remove employee':
                    console.log('this worked');
                    beginPrompts();
                    break;


                case 'Update employee role':
                    console.log('this worked');
                    beginPrompts();
                    break;


                case 'Update employee manager':
                    console.log('this worked');
                    beginPrompts();
                    break;

            };

        });

};


const viewAllEmployees = () => {
    // View a list of all the employees along with their title salary and department
    connection.query('Select employee.first_name, employee.last_name, role.title, role.salary, department.department_name FROM employee JOIN role on role.id = employee.role_id JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;',
        (err, res) => {
            if (err) throw (err)
            console.table(res)
            beginPrompts();
        })
};

// const viewByDepartment = () => {
//     inquirer
//         .prompt({
//             name: 'departmentChoices',
//             type: 'list',
//             message: 'Which department would you like to view?',
//             choices: departmentChoices
//         })
//         .then((answer) => {
//             switch (answer.options) {
//                 case 'Sales':
//                     connection.query(`Select F,
//                         function (err, res) {
//                             if (err) throw (err)
//                             console.table(res);


//                         });
//                     break;
//             };
//         });
// };


const viewRoles = () => {
    // Returns a list of all departments
    connection.query('Select * From role', (err, res) => {
        if (err) throw (err);
        console.table(res);
        beginPrompts()
    })
};
