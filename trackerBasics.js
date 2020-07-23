const mysql = require('mysql');
const util = require("util");
const inquirer = require("inquirer");
const cTable = require('console.table');

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

connection.connect();
connection.queryPromise = util.promisify(connection.query);

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
//     init();
// });

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
        if (answer.choice === "Add Department") {
            addDepartment();
        }
        if (answer.choice === "Add Role") {
            addRole();
        }
        if (answer.choice === "Add Employee") {
            addEmployee();
        }
        if (answer.choice === "View Department") {
            viewDepartment();
        }
        if (answer.choice === "View Role") {
            viewRole();
        }
        if (answer.choice === "View Employee") {
            viewEmployee();
        }
    })
}
init();

function addDepartment() {
    inquirer.prompt({
      message: "Enter the department name: ",
      type: "input",
      name: "name"
    })
      .then(function(answer) {
          console.table(answer);
        connection.queryPromise("INSERT INTO department (name) VALUES (?)", [answer.name]);
        init();
      })
}

function addRole() {
    // read the deparments table
    connection.queryPromise("SELECT * FROM department")
      .then(function(departments) {
        return inquirer.prompt([
          {
            message: "Enter the title: ",
            type: "input",
            name: "title"
          },
          {
            message: "Enter the salary",
            type: "input",
            name: "salary"
          },
          {
            message: "Select the department: ",
            type: "list",
            name: "department_id",
            choices: departments.map(function (department) {
              return {
                name: department.name,
                value: department.id,
              };
            })
          },
        ])
    })
      .then(function(answer) {
        console.table(answer);
        connection.queryPromise("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.title, answer.salary, answer.department_id]);
        init();
      })
}

function addEmployee() {
    connection.queryPromise("SELECT * FROM role")
    .then(function(roles) {
        return inquirer.prompt([
            {
                message: "Enter First Name",
                type: "input",
                name: "first_name"
            },
            {
                message: "Enter Last Name",
                type: "input",
                name: "last_name"
            },
            {
                message: "Enter Role ID",
                type: "input",
                name: "role_id"
            },
            {
                message: "Enter Manager ID",
                type: "input",
                name: "manager_id"
            },

        ])
    })
      .then(function(answer) {
          console.table(answer);
          connection.queryPromise("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]);
      })
}

function viewDepartment(){
    connection.query("SELECT * FROM department", function(err, results){
        if (err) throw err;
        console.table(results);
        init();
    })
}