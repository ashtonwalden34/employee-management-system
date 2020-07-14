var mysql = require("mysql");
var inquirer = require("inquirer");
const Choice = require("inquirer/lib/objects/choice");

var connection = mysql.createConnection({
    host: "localhost", 

    port: 3306,
    
    user: "root",

    password: "password",
    database: "ems_db"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connected as id " + connection.threadId);
    connection.end();
})

function action() {
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
        .then(function(answer) {
            switch(answer.action) {
                case "View departments":
                    // display departments
                    break;
                case "View roles":
                    // display roles
                    break;
                case "View employees":
                    // display employees
                    break;
                case "Add department":
                    // prompt user for info about department
                    // add data to database
                    break;
                case "Add role":
                    // prompt user for info about role
                    // add data to database
                    break;
                case "Add employee":
                    // prompt user for info about employee
                    // add data to database
                    break;
                case "Update roles":
                    // prompt user for info about updated role
                    // update data in database
                    break
            }
        })
}