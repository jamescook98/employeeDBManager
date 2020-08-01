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

connection.connect(function(err) {
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
          name: "Add An Employee",
          value: "addEmployee"
        },
        {
          name: "Update An Employee",
          value: "updateEmployee"
        },
        {
          name: "View All Employees",
          value: "viewAllEmployees"
        },
        {
          name: "View All Employees By Department",
          value: "viewAllEmployeesByDept"
        },
        {
          name: "View All Employees By Role",
          value: "viewAllEmployeesByRole"
        }
      ]
    }
  ]);

  switch (choice) {
    case "addEmployee":
      createEmployee();
      return;
    case "updateEmployee":
      updateEmployee();
      return;
    case "viewAllEmployees":
      viewAllEmployees();
      return;
    case "viewAllEmployeesByDept":
      viewAllEmployeesByDept();
      return;
    case "viewAllEmployeesByRole":
      viewAllEmployeesByRole();
      return;
    default:
      return;
  }
}

async function createEmployee() {
  const userInput = await prompt([
    {
      type: "input",
      message: "Employee  ID:",
      name: "id"
    },
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
  addEmployee( userInput.first_name, userInput.last_name, userInput.role_id, userInput.manager_id);
}


function addEmployee( first_name, last_name, role_id, manager_id) {
  var queryString = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
  connection.query(queryString, [first_name, last_name, role_id, manager_id]);
}

function updateEmployee() {
  console.log("updatin' ye employee");
}

function viewAllEmployees() {
  orm.select("employee");
  mainScreen();
}

function viewAllEmployeesByDept() {
  console.log("viewin' yer employees by depARRRRtment");
}

function viewAllEmployeesByRole() {
  console.log("viewin' yer employees by rrrrrole");
}
// * Add departments, roles, employees

// * View departments, roles, employees

// * Update employee roles