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
  database: "employeesDB"
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
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

function viewAllEmployees() {
  orm.select("employee");
  setTimeout(function () {
    mainScreen();
  }, 2000);
}

async function createEmployee() {
  const employeeInput = await prompt([
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
  addEmployee(employeeInput.first_name, employeeInput.last_name, employeeInput.role_id, employeeInput.manager_id);
  setTimeout(function () {
    orm.select("employee");
    console.log("Employee has been added.");
  }, 1000);
  setTimeout(function () {
    mainScreen();
  }, 2000);
}

function addEmployee(first_name, last_name, role_id, manager_id) {
  var queryString = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
  connection.query(queryString, [first_name, last_name, role_id, manager_id]);
}

async function updateEmployee() {
  orm.select("employee");
  console.log("\n");
  const choice = await prompt([
    {
      type: "input",
      message: "What is the ID of the employee you are updating?",
      name: "employee_id"
    }
  ]);
  var nameOfEmployeeBeingUpdated = choice.employee_id;
  orm.selectByField("employee", "id", choice.employee_id)
  const updatedEmployeeInput = await prompt([
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

  var queryString = "DELETE FROM employee WHERE first_name='"+nameOfEmployeeBeingUpdated+"'";
  connection.query(queryString, nameOfEmployeeBeingUpdated);
  addEmployee(updatedEmployeeInput.first_name, updatedEmployeeInput.last_name, updatedEmployeeInput.role_id, updatedEmployeeInput.manager_id);
  orm.select("employee");
  console.log("Employee has been updated.")
  setTimeout(function () {
    mainScreen();
  }, 2000);
}

async function deleteEmployee() {
  orm.select("employee");
  const choice = await prompt([
    {
      type: "input",
      message: "What is the ID of the employee you want to delete?",
      name: "idToBeDeleted"
    }
  ]);
  var deletedEmployee = choice.idToBeDeleted;
  var queryString = "DELETE FROM employee WHERE id='"+deletedEmployee+"'";
  connection.query(queryString, deletedEmployee);
  console.log("Employee has been deleted.")
  setTimeout(function () {
    mainScreen();
  }, 2000);
}


//      VIEW/ADD/DELETE ROLES


async function Roles() {
  const choice = await prompt([
    {
      type: "list",
      name: "choice",
      message: "Please select an action.",
      choices: [
        {
          name: "View All Roles",
          value: "view_all_roles"
        },
        {
          name: "Add Role",
          value: "add_role"
        },
        {
          name: "Delete Role",
          value: "delete_role"
        }
      ]
    }
  ]);
  if (choice.choice == "view_all_roles") {
    orm.select("role");
  } else if (choice.choice == "add_role") {
    const roleInput = await prompt([
      {
        type: "input",
        message: "Role title:",
        name: "role_title"
      },
      {
        type: "input",
        message: "Role salary:",
        name: "role_salary"
      },
      {
        type: "input",
        message: "Role department ID:",
        name: "role_department_id"
      }
    ]);
    addRole(roleInput.role_title, roleInput.role_salary, roleInput.role_department_id);
    console.log("Role has been added.")
    setTimeout(function () {
      orm.select("role");
    }, 1000)
  } else if(choice.choice == "delete_role") {
    orm.select("role");
    const choice = await prompt([
      {
        type: "input",
        message: "What is the ID of the role you want to delete?",
        name: "idToBeDeleted"
      }
    ]);
    var deletedRole = choice.idToBeDeleted;
    var queryString = "DELETE FROM role WHERE id='"+deletedRole+"'";
    connection.query(queryString, deletedRole);
    console.log("Role has been deleted.")
  }
  setTimeout(function () {
    mainScreen();
  }, 2000);
}

function addRole(role_title, role_salary, role_department_id) {
  var queryString = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
  connection.query(queryString, [role_title, role_salary, role_department_id]);
}

function deleteRole(role_id) {
  var queryString = "DELETE FROM role WHERE id='"+role_id+"'";
  connection.query(queryString, role_id);
}


//      VIEW/ADD/DELETE DEPARTMENTS


async function Departments() {
  const choice = await prompt([
    {
      type: "list",
      name: "choice",
      message: "Please select an action.",
      choices: [
        {
          name: "View All Departments",
          value: "view_all_departments"
        },
        {
          name: "Add Department",
          value: "add_department"
        },
        {
          name: "Delete Department",
          value: "delete_department"
        }
      ]
    }
  ]);
  if (choice.choice == "view_all_departments") {
    orm.select("department");
  } else if (choice.choice == "add_department") {
    const departmentInput = await prompt([
      {
        type: "input",
        message: "Department name:",
        name: "department_name"
      },
    ]);
    addDepartment(departmentInput.department_name);
    console.log("Department has been added.")
    setTimeout(function () {
      orm.select("department");
    }, 1000)
  } else if(choice.choice == "delete_department") {
    orm.select("department");
    const deleteDepartmentInput = await prompt([
      {
        type: "input",
        message: "Which department do you want to delete?",
        name: "department_name"
      },
    ]);
    deleteRole(deleteDepartmentInput.department_name);
    console.log("Department has been deleted.")
  }
  setTimeout(function () {
    mainScreen();
  }, 2000);
}

function addDepartment(department_name) {
  var queryString = "INSERT INTO department (name) VALUES (?)";
  connection.query(queryString, department_name);
}

function deleteRole(department_name) {
  var queryString = "DELETE FROM department WHERE name='"+department_name+"'";
  connection.query(queryString, department_name);
}
