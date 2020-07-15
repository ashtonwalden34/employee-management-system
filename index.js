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
                case "Exit":
                    endAction();
                    break;
            }
        });
}

// function to retrieve departments from database and display to user
function viewDepartments() {
    var query = "SELECT * FROM department"
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res)
        }
        action();
    });
};

// function to retrieve roles from database and display to user
function viewRoles() {
    var query = "SELECT * FROM employee"
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res)
        }
        action();
    });
};

// function to retrieve employees from database and display to user
function viewEmployees() {
    var query = "SELECT * FROM employee_role"
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
        .then(function(answer) {
            // function to add department to database
            connection.query("INSERT INTO department (deptName) VALUES (?)",[answer.deptName], function(err, res) {
                console.log(err);
                console.log(res);
                action();
            })
            
        })
};

// function to allow the user to add a role to the database
function addRole() {

    connection.query("SELECT * FROM department", function(err, res) {
        console.log(err, res);
        var deptNames = []
        for (i = 0; i < res.length; i++) {
            console.log('??',res[i].deptName)
            deptNames.push(res[i].deptName);

        }
        console.log(deptNames);

        inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "Enter the title of the role you would like to add"
            },
            {
                name: "salary",
                type: "input",
                message: "Enter the salary for the role you would like to add"
            },
            {
                name: "deptName",
                type: "list",
                message: "Pick a Dept it belongs too",
                choices: deptNames
            }
        ])
        .then(function(answer) {
            console.log('this is our answer', answer)
            // function to add role to database
            var deptId;
            for (let i = 0; i < res.length; i++) {
                if (res[i].deptName === answer.deptName) {
                    deptId = res[i].id
                }
            }
            console.log('DEPT ID for our new role', deptId)

            // db time
        })

    })
    
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
                message: "Please enter the employee id of this employee's manager"
            }
        ])
        .then(function(answer) {
            // function to add employee to database based on user input

        })

};

// function to allow the user to update an employee's role in the database
function updateRole() {
    connection.query("SELECT * FROM employee", function(err, res) {
        console.log(err);
        console.log(res);

        var fullNames = [];
        for (let i = 0; i < res.length; i++) {
            
            fullNames.push(res[i].first_name + ' ' + res[i].last_name);

            console.log("These are the full names " + fullNames);
        }
    

        console.log(fullNames);

        inquirer
            .prompt([
                {
                    name: "employee",
                    type: "list",
                    choices: fullNames
                }
            ])
            .then(function(answer) {
                // function to get user answer and turn it into ID
                // once employee has been identified by role then prompt user to select role to update
                // then pass updated role to database
            })
    })
};

// function to end inquirer and stop connection
function endAction() {
    connection.end();
};