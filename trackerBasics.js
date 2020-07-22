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

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    init();
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

        case "View Employee":
            viewEmployee();
            break;

        case "Update Employee Role":
            updateEmployeeRole();
            break;
        }
    });
}
init();

function addDepartment() {
    inquirer.prompt({
      message: "Enter the department name: ",
      type: "input",
      name: "name"
    })
      .then(function(answer) {
        connection.query('INSERT INTO department (name) VALUES (?)', [answer.name]);
        init();
      })
}