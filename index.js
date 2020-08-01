const util = require("util");
const mysql = require("mysql");
const { prompt } = require("inquirer");
var orm = require("./config/orm.js");
require("console.table");



var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employees"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});


mainScreen();

async function mainScreen() {
  const { choice } = await prompt([
    {
      type: "list",
      name: "choice",
      message: "Please select an action.",
      choices: [
        {
          name: "View All Employees",
          value: "viewAllEmployees"
        },
        {
          name: "Add An Employee",
          value: "addEmployee"
        },
        {
          name: "Update An Employee",
          value: "updateEmployee"
        },
        {
          name: "Delete An Employee",
          value: "deleteEmployee"
        },
        {
          name: "Roles",
          value: "roles"
        },
        {
          name: "Departments",
          value: "departments"
        }
      ]
    }
  ]);

  switch (choice) {

    case "viewAllEmployees":
      viewAllEmployees();
      return;
    case "addEmployee":
      createEmployee();
      return;
    case "updateEmployee":
      updateEmployee();
      return;
    case "deleteEmployee":
      deleteEmployee();
      return;
    case "roles":
      Roles();
      return;
    case "departments":
      Departments();
      return;
    default:
      return;
  }
}

async function createEmployee() {
  const userInput = await prompt([
    {
      type: "input",
      message: "Employee first name:",
      name: "first_name"
    },
    {
      type: "input",
      message: "Employee last name:",
      name: "last_name"
    },
    {
      type: "input",
      message: "Employee role ID:",
      name: "role_id"
    },
    {
      type: "input",
      message: "Employee manager ID:",
      name: "manager_id"
    }
  ]);
  addEmployee(userInput.first_name, userInput.last_name, userInput.role_id, userInput.manager_id);
  orm.select("employee");
  console.log("Employee has been added.")
  setTimeout(function () {
    mainScreen();
  }, 2000);
}

function viewAllEmployees() {
  orm.select("employee");
  setTimeout(function () {
    mainScreen();
  }, 2000);
}

function addEmployee(first_name, last_name, role_id, manager_id) {
  var queryString = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
  connection.query(queryString, [first_name, last_name, role_id, manager_id]);
}

function updateEmployee() {
  console.log("updatin' ye employee");

  //which employee?
  //
}


function deleteEmployee() {
  console.log("viewin' yer employees by depARRRRtment");
}

function Roles() {
  console.log("viewin' yer employees by rrrrrole");
}

function Departments() {
  console.log("viewin' yer employees by rrrrrole");
}
// * Add departments, roles, employees

// * View departments, roles, employees

// * Update employee roles

// functions: addEmployee, updateEmployee, viewAllEmployees, deleteEmployee, editRoles, editDepartments