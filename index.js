// requires mysql for databse
var mysql = require("mysql");
// requires inquirer to prompt user for input
var inquirer = require("inquirer");
const Choice = require("inquirer/lib/objects/choice");

// connects to mysql
var connection = mysql.createConnection({
    host: "localhost", 
    port: 3306,
    user: "root",
    password: "password",
    // selects employee-management-system database
    database: "ems_db"
});

// function to connect to database
connection.connect(function(err) {
    // displays error if one is enountered 
    if(err) throw err;
    // console logs id if connection is succesful
    console.log("connected as id " + connection.threadId);
    // runs action function after connection is made
    action();
    // connection.end();
})

// function to prompt user and respond based on the selection
function action() {
    // user is prompted using inquirer
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "Please select an action.",
            choices: [
                "View departments",
                "View roles",
                "View employees",
                "Add department", 
                "Add role", 
                "Add employee", 
                "Update roles"
            ]
        })
        // .then switch statement function based on user selection
        .then(function(answer) {
            // switch statement to run different cases basaed on selection
            switch(answer.action) {
                case "View departments":
                    viewDepartments();
                    break;
                case "View roles":
                    viewRoles();
                    break;
                case "View employees":
                    viewEmployees();
                    break;
                case "Add department":
                    addDepartment();
                    break;
                case "Add role":
                    addRole();
                    break;
                case "Add employee":
                    addEmployee();
                    break;
                case "Update roles":
                    updateRole();
                    break;
            }
        });
}

// function to retrieve departments from database and display to user
function viewDepartments() {
    var query = "SELECT id, deptname FROM department"
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res)
        }
        action();
    });
};

// function to retrieve roles from database and display to user
function viewRoles() {
    var query = "SELECT id, first_name, last_name, role_id, manager_id FROM employee"
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res)
        }
        action();
    });
};

// function to retrieve employees from database and display to user
function viewEmployees() {
    var query = "SELECT id, title, salary, deptID FROM employee_role"
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res)
        }
        action();
    });
};

// function to allow the user to add a department to the database
function addDepartment() {
    inquirer
        .prompt(
            {
            name: "deptName",
            type: "input",
            message: "What department woudld you like to add?"
        })
};

// function to allow the user to add a role to the database
function addRole() {
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "Enter the title of the role you would like to add"
            },
            {
                name: "salary",
                typle: "input",
                message: "Enter the salary for the role you would like to add"
            },
            {
                name: "deptID",
                type: "input",
                message: "Enter the department id for the department that the role belongs to"
            }
        ])
};

// function to allow the user to add an employee to the database
function addEmployee() {
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "Please enter the new employee's first name"
            },
            {
                name: "last_name",
                type: "input",
                message: "Please enter the new employee's last name"
            },
            {
                name: "role_id",
                type: "input",
                message: "Please enter the id of the corresponding role the employee has"
            },
            {
                name: "manager_id",
                type: "input",
                message: "Please enter the employee's manager's id"
            }
        ])
        .then(function(answer) {
            // function to add employee to database based on user input
        })

};

// function to allow the user to update an employee's role in the database
function updateRole() {

};