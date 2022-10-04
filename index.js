const inquirer = require("inquirer");
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
            console.log('\n');
            console.table(roles);
        })
        .then(() => mainMenu());
};

const viewAllEmployees = () => {
    db.seeAllEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log('\n');
            console.table(employees);
        })
        .then(() => mainMenu());
};

const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: 'newDepartment',
                type: 'input',
                message: 'What is the name of your new department?'
            }
        ])
        .then((response) => {
            let department = response.newDepartment
            db.createNewDepartment(department);
        })
        .then(() => console.log('Your new department was added to the database!'))
        .then(() => mainMenu());
};

const addRole = () => {
    inquirer
        .prompt([
            {
                name: 'roleName',
                
            }
        ])
};

const addEmployee = () => {};

const updateEmployee = () => {};

const quit = () => {
  console.log("Goodbye!");
  process.exit();
};

init();
