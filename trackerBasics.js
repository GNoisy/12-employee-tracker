const mysql = require('mysql');
const util = require("util");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "employeeTracker_DB"
});

function init() {
    inquirer
      .prompt({
        name: "choice",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
          "Add Department",
          "Add Role",
          "Add Employee",
          "View Department",
          "View Role",
          "View Employee"
        ]
    })
      .then(function(answer) {
        switch (answer.action) {
        case "Add Department":
            addDepartment();
            break;

        case "Add Role":
            addRole();
            break;

        case "Add Employee":
            addEmployee();
            break;

        case "View Department":
            viewDepartment();
            break;

        case "View Role":
            viewRole();
            break;

        case "View Role":
            viewRole();
            break;
        }
    });
}
init();
