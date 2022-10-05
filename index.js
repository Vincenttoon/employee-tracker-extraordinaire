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
        name: "department",
        type: "input",
        message: "What is the name of your new department?",
      },
    ])
    .then((response) => {
      let department = response.department;
      db.createNewDepartment(department);
    })
    .then(() => console.log("Your new department was added to the database!"))
    .then(() => viewAllDepartments());
};

// HERE TO
const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the first name of your new employee?",
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the last name of your new employee?",
      },
    ])
    .then((response) => {
      let firstName = response.first_name;
      console.log(firstName);
      let lastName = response.last_name;
      console.log(lastName);
      db.seeAllRoles().then(([rows]) => {
        let roles = rows;
        const roleChoices = roles.map(({ role_id, title }) => ({
          name: title,
          value: role_id,
        }));
        inquirer
          .prompt([
            {
              name: "role_id",
              type: "list",
              message: "What is the role of your new employee?",
              choices: roleChoices,
            },
          ])
          .then((response) => {
            let roleId = response.role_id;
            console.log(roleId);
            db.seeAllEmployees().then(([rows]) => {
              let employees = rows;
              const managerChoices = employees.map(
                ({ id, first_name, last_name }) => ({
                  name: `${first_name} ${last_name}`,
                  value: id,
                })
              );
                managerChoices.unshift({ name: "None", value: null });
                console.log(managerChoices);
              inquirer
                .prompt([
                  {
                    name: "manager_id",
                    type: "list",
                    message: "Who is the manager of your new employee?",
                    choices: managerChoices,
                  },
                ])
                .then((response) => {
                  let managerId = response.manager_id;
                  console.log(managerId);
                  let employees = {
                    first_name: firstName,
                    last_name: lastName,
                    role_id: roleId,
                    manager_id: managerId,
                  };
                  db.createNewEmployee(employees)
                    .then(() =>
                      console.log("New employee added to the database")
                    )
                    .then(() => viewAllEmployees());
                });
            });
          });
      });
    });
};

const addRole = () => {
  db.seeAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ department_id, name }) => ({
      name: name,
      value: department_id,
    }));
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Please enter an employment role you would like to add:",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of this role?",
        },
        {
          name: "department_id",
          type: "list",
          message: "Where would you like to add your new role?",
          choices: departmentChoices,
        },
      ])
      .then((response) => {
        db.createNewRoles(response)
          .then(() => console.log(`Added new role to the database!`))
          .then(() => viewAllRoles());
      });
  });
};

const updateEmployee = () => {
  db.seeAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name}, ${last_name}`,
      value: id,
    }));
    inquirer
      .prompt([
        {
          name: "employee_id",
          type: "list",
          message: "Which employee do you want to update?",
          choices: employeeChoices,
        },
      ])
      .then((response) => {
        let employeeId = response.employee_id;
        db.seeAllRoles().then(([rows]) => {
          let roles = rows;
          const roleChoices = roles.map(({ role_id, title }) => ({
            name: title,
            value: role_id,
          }));
          inquirer
            .prompt([
              {
                name: "role_id",
                type: "list",
                message: "What is the new role for this employee?",
                choices: roleChoices,
              },
            ])
            .then((response) => {
              let roleId = response.role_id;
              db.updateEmployeeRoles(employeeId, roleId)
                .then(() => console.log("Updated employee role!"))
                .then(() => viewAllEmployees());
            });
        });
      });
  });
};
// HERE

const quit = () => {
  console.log("Goodbye!");
  process.exit();
};

init();
