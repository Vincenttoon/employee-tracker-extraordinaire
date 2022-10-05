const inquirer = require("inquirer");
const { seeAllRoles, seeAllEmployees } = require("./data");
const db = require("./data");
require("console.table");

const init = () => {
  mainMenu();
};

const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "mainMenu",
        message: "Please select an option below:",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit",
        ],
      },
    ])
    .then((response) => {
      switch (response.mainMenu) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateEmployee();
          break;
        case "Quit":
          quit();
          break;
      }
    });
};

const viewAllDepartments = () => {
  db.seeAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => mainMenu());
};

const viewAllRoles = () => {
  db.seeAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => mainMenu());
};

const viewAllEmployees = () => {
  db.seeAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => mainMenu());
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "What is the name of your new department?",
      },
    ])
    .then((response) => {
      let department = response.newDepartment;
      db.createNewDepartment(department);
    })
    .then(() => console.log("Your new department was added to the database!"))
    .then(() => mainMenu());
};

// HERE TO
const addRole = () => {
  inquirer.prompt([
    {
      name: "roleName",
      type: "input",
      message: "Please enter an employment role you would like to add:",
    },
    {
      name: "roleSalary",
      type: "input",
      message: "What is the salary of this role?",
    },
    {
      name: "roleDepartment",
      type: "input",
      message: "Where would you like to add your new role?",
    },
  ]);
};

const addEmployee = () => {
  inquirer.prompt([
    {
      name: "add_first_name",
      type: "input",
      message: "What is the first name of your new employee?",
    },
    {
      name: "add_last_name",
      type: "input",
      message: "What is the last name of your new employee?",
    },
    {
      name: "add_role",
      type: "list",
      message: "What is the role of your new employee?",
      choices: seeAllRoles(),
    },
    {
      name: "add_manager",
      type: "list",
      message: "Who is the manager of your new employee?",
      // choices: 'see all managers?
    },
  ]);
};

const updateEmployee = () => {
  inquirer.prompt([
    {
      name: "update",
      type: "list",
      message: "Which employee do you want to update?",
      choices: seeAllEmployees(),
    },
    {
      name: "newRole",
      type: "list",
      message: "What is the new role for this employee?",
      choices: seeAllRoles(),
    },
  ]);
};
// HERE

const quit = () => {
  console.log("Goodbye!");
  process.exit();
};

init();
