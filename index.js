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
                "Update roles",
                "Exit"
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
            // Displays departments to user in an easy to read way
            console.log(
                "Department ID: " + res[i].dept_id + ' || ' +
                "Department Title: " + res[i].dept_name
                );
        }
        // runs action function again to ask the user which action they would like to do
        action();
    });
};

// function to retrieve roles from database and display to user
function viewRoles() {
    var query = "SELECT * FROM employee_role"
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res)
            // Displays roles to user in an easy to read way
            console.log(
                "Role ID: " + res[i].role_id + ' || ' +
                "Role: " + res[i].title + ' || ' +
                "Salary: $" + res[i].salary + ' || ' +
                "Department ID: " + res[i].dept_id
            )
        }
        // runs action function again to ask the user which action they would like to do
        action();
    });
};

// function to retrieve employees from database and display to user
function viewEmployees() {
    var query = "SELECT * FROM employee"
    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
           console.log(res)
           // Displays employees to user in an easy to read way
           console.log(
               "Employee ID: " + res[i].employee_id + ' || ' +
               "Name: " + res[i].first_name + ' ' + res[i].last_name + ' || ' +
               "Role ID: " + res[i].role_id + ' || ' +
               "Manger ID: " + res[i].manager_id
           )
        }
        // runs action function again to ask the user which action they would like to do
        action();
    });
};

// function to allow the user to add a department to the database
function addDepartment() {
    inquirer
    // prompts user to name new department
        .prompt(
            {
            name: "dept_name",
            type: "input",
            message: "What department woudld you like to add?"
        })
        .then(function(answer) {
            // function to add department to database
            connection.query("INSERT INTO department (dept_name) VALUES (?)",[answer.dept_name], function(err, res) {
                if(err === null) {
                    console.log("Succesfully added department " + answer.dept_name);
                } else {
                    console.log("Errors: " + err);
                }
                // console.log(res);
                // runs action function again to ask the user which action they would like to do
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
            // console.log('??',res[i].dept_name)
            deptNames.push(res[i].dept_name);
        }

        // console.log(deptNames);

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
            // console.log('this is our answer', answer)
            // function to add role to database
            var deptId;
            for (let i = 0; i < res.length; i++) {
                if (res[i].dept_name === answer.dept_name) {
                    deptId = res[i].dept_id
                }
            }
            
            console.log('DEPT ID for our new role', deptId)
            // db time
            // adds new role to database
            connection.query("INSERT INTO employee_role (title, salary, dept_id) values (?, ?, ?)", 
            [answer.title, answer.salary, deptId], 
            function(err, res) {
                if(err === null) {
                    console.log("Succesfully added role " + answer.title);
                } else {
                    console.log("Errors: " + err);
                }
                // runs action function again to ask the user which action they would like to do
                action();  
            });          
        });
    });
};

// function to allow the user to add an employee to the database
function addEmployee() {

    connection.query("SELECT * FROM employee", function(err, res) {
        // console.log(err);
        // console.log(res);

        var employees = [];
        for (let i = 0; i < res.length; i++) {   
            employees.push('Name: ' + res[i].first_name + ' ' + res[i].last_name + ' ' + 'Id: ' + res[i].employee_id)
        }
        // console.log(employees);

    connection.query("SELECT * FROM employee_role", 
    function(err, res) {
        // console.log(err, res);
        var roles = []
        for (let i = 0; i < res.length; i++) {
            // console.log("test --  " + res[i].title)
            roles.push(res[i].title);  
        }
        // console.log("these are the roles " + roles)
        
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
                name: "role_title",
                type: "list",
                message: "Please select the role of the new employee",
                choices: roles
            },
            {
                name: "manager",
                type: "list",
                message: "Please select the new employee's manager",
                choices: employees
            }
        ])
        .then(function(answer) {
            // takes user input for role and converts it to the corresponding id
            var roleID;            
            for (let i = 0; i < res.length; i++) {
                if (res[i].title === answer.role_title) {
                    roleID = res[i].role_id
                }
            }
            // takes the user input for manager and splits it to get the corresponding id
            var managerID = answer.manager.split(' ')[4];
         
        // adds new employee to database
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) values (?, ?, ?, ?)",
        [answer.first_name, answer.last_name, roleID, managerID],
        function(err, res) {
            if(err === null) {
                console.log("Succesfully added employee " + answer.first_name + ' ' + answer.last_name);
            } else {
                console.log("Errors: " + err);
            }
            action();
        });
    });
    });
    });
};

// function to allow the user to update an employee's role in the database
function updateRole() {
    connection.query("SELECT * FROM employee", function(err, res) {
        // console.log(err);
        // console.log(res);
        var employeeList = [];
        for (let i = 0; i < res.length; i++) {
            employeeList.push('Name: ' + res[i].first_name + ' ' + res[i].last_name + ' ' + 'Id: ' + res[i].employee_id);
        }

    connection.query("SELECT * FROM employee_role", function(err, res) {
        // console.log(err);
        // console.log(res);
        var rolesList = []
        for (let i = 0; i < res.length; i++) {
            rolesList.push(res[i].title);
        }

        inquirer
            .prompt([
                {
                    name: "employee",
                    type: "list",
                    message: "Please select the employee whose role you would like to change",
                    choices: employeeList
                },
                {
                    name: "updatedRole",
                    type: "list",
                    message: "Please select the new role you would like to assign",
                    choices: rolesList
                }
               
            ]).then(function(answer) {
                // console.log(answer.employee)
                //console.log(res)

                // splits the user selected answer for employee to get the id value
                var employeeID = answer.employee.split(" ")[4];
                // console.log(employeeID);

                // converts role from title to id
                var updatedRoleID
                for (let i = 0; i < res.length; i++) {
                    if(res[i].title === answer.updatedRole) {
                        updatedRoleID = res[i].role_id
                    }
                    // console.log(updatedRoleID)  
                }

                // updates the role field in the employee table to hold new id
                connection.query(
                "UPDATE employee SET role_id = ? WHERE employee_id = ?",
                [updatedRoleID, employeeID],
                function(err, res) {
                    if(err === null) {
                        console.log("Succesfully updated employee role");
                    } else {
                        console.log("Errors: " + err);
                    }
                    action();
                    })  
            })
    })
});
};

// function to end inquirer and stop connection
function endAction() {
    connection.end();
};