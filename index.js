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
                "Update roles",
                "Delete employee"
            ]
        })
}