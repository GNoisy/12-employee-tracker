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

connection.connect();
connection.queryPromise = util.promisify(connection.query);

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
          "View Employee",
          "Update Employee Role"
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
        if (answer.choice === "Update Employee Role") {
            updateEmployeeRole();
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

function addEmployee(){
    connection.queryPromise('SELECT * FROM role')
    .then(function(roles){
        connection.queryPromise('SELECT * FROM employee')
            .then(function(employees) {
                employees = employees.map(function (employee) {
                    return {
                        value: employee.id,
                        name: employee.first_name + ' ' + employee.last_name,
                    }
                })
                employees.push({ name: 'None', value: 'none' });
                inquirer.prompt([
                    {
                        name: 'first_name',
                        message: 'Enter the first name: ',
                        type: 'input',
                    },
                    {
                        name: 'last_name',
                        message: "Enter the last name: ",
                        type: "input",
                    },
                    {
                        message: "Select the role for the employee",
                        name: "role_id",
                        type: "list",
                        choices: roles.map(function(role){
                            return {
                                name: role.title,
                                value: role.id,
                            }
                        })
                    },
                    {
                        message: "Select the manager: ",
                        name: "manager_id",
                        type: "list",
                        choices: employees
                    }
                ]).then(function(answers){
                    console.log(answers);
                    if (answers.manager_id === 'none') {
                        connection.queryPromise('INSERT INTO employee (first_name, last_name, role_id) VALUES ( ?, ?, ?)', [answers.first_name, answers.last_name, answers.role_id]);
                    }else{
                        connection.queryPromise('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]);
                        
                    }
                    init();
                });
            });
       
    });
}

function viewDepartment(){
    connection.query("SELECT * FROM department", function(err, results){
        if (err) throw err;
        console.table(results);
        init();
    })
}

function viewRole(){
    connection.query("SELECT * FROM role", function(err, results){
        if (err) throw err;
        console.table(results);
        init();
    })
}

function viewEmployee(){
    connection.query("SELECT * FROM employee", function(err, results){
        if (err) throw err;
        console.table(results);
        init();
    })
}

function updateEmployeeRole(){
    connection.query("SELECT * FROM role", function(err, results){
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "update",
                    type: "rawlist",
                    choices: function(){
                        var choiceArray = [];
                        for (var i=0; i<results.length; i++){
                            choiceArray.push(results[i].id);
                        }
                        return choiceArray;
                    },
                    message: "Which role do you like to update?"
                },
                {
                    name: "title",
                    type: "input",
                    message: "What's the title of the role you'd like to update?"
                },
                {
                    name: "salary",
                    type: "input",
                    message: "What's the salary of the role you want to update?"
                },
                {
                    name: "department",
                    type: "input",
                    message: "What's the department to update role?"
                }
            ])
            .then(function(answer){
                connection.query()
            })
    })
}
