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
                'View all employees by department',
                'View all employees by manager',
                'Add employee',
                'Remove employee',
                'Update employee role',
                'Update employee manager'
            ]
        })

        .then((answer) => {
            switch (answer.options) {
                case 'View all employees':
                    console.log('this worked');
                    viewAllEmployees();
                    break;

                case 'View all employees by department':
                    console.log('this worked');
                    beginPrompts();
                    break;

                case 'View all employees by manager':
                    console.log('this worked');
                    beginPrompts();
                    break;

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
    connection.query('Select * from employee',
        function (err, res) {
            if (err) throw (err)
            console.table(res)
            beginPrompts();
        })
}


