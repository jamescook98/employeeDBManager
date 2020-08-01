const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

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
      addEmployee();
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

function addEmployee() {
  console.log("addin' ye employee");
}

function updateEmployee() {
  console.log("updatin' ye employee");
}

function viewAllEmployees() {
  console.log("viewin' yer employees");
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
