// packages required for apps full functionality
const inquirer = require("inquirer");
const db = require("./data");
require("console.table");
const largeText = `
_______  __   __  _______  ___      _______  __   __  _______  _______    _______  ______    _______  _______  ___   _  _______  ______   
|       ||  |_|  ||       ||   |    |       ||  | |  ||       ||       |  |       ||    _ |  |   _   ||       ||   | | ||       ||    _ |  
|    ___||       ||    _  ||   |    |   _   ||  |_|  ||    ___||    ___|  |_     _||   | ||  |  |_|  ||       ||   |_| ||    ___||   | ||  
|   |___ |       ||   |_| ||   |    |  | |  ||       ||   |___ |   |___     |   |  |   |_||_ |       ||       ||      _||   |___ |   |_||_ 
|    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|    |   |  |    __  ||       ||      _||     |_ |    ___||    __  |
|   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___     |   |  |   |  | ||   _   ||     |_ |    _  ||   |___ |   |  | |
|_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|    |___|  |___|  |_||__| |__||_______||___| |_||_______||___|  |_|

`

// arrow function to trigger start of application
const init = () => {
  console.log(largeText);
  mainMenu();
};

// Main menu to prompt different actions in the application and provide a callback for certain functions
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
      // switch/case operations to trigger different application functions
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

// function to view all departments
const viewAllDepartments = () => {
  // call see all departments from DB class
  db.seeAllDepartments()
  // then assign them to rows
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      // display departments in table
      console.table(departments);
    })
    // recall to main menu options
    .then(() => mainMenu());
};

// function to see all rows
const viewAllRoles = () => {
  // call see all roles from DB class
  db.seeAllRoles()
  // then assign them to rows
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      // display departments in table
      console.table(roles);
    })
    // recall to main menu options
    .then(() => mainMenu());
};

// function to see all employees
const viewAllEmployees = () => {
   // call see all employees from DB class
  db.seeAllEmployees()
  // then assign them to rows
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      // display employees in table
      console.table(employees);
    })
    // recall to main menu options
    .then(() => mainMenu());
};

// function to add a department
const addDepartment = () => {
  // prompt more questions for user information
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the name of your new department?",
      },
    ])
    // take then response and insert it into the departments database
    .then((response) => {
      let department = response.department;
      // call db function to execute
      db.createNewDepartment(department);
    })
    .then(() => console.log("Your new department was added to the database!"))
    // view all departments to see your changes, which then prompts the main menu
    .then(() => viewAllDepartments());
};

// function to add an employee
const addEmployee = () => {
  // prompt more questions for user information
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
    // take the responses and assign it to variables
    .then((response) => {
      let firstName = response.first_name;
      console.log(firstName);
      let lastName = response.last_name;
      console.log(lastName);
      // call db see all roles and align characteristics to rows
      db.seeAllRoles().then(([rows]) => {
        let roles = rows;
        // map-filer out role_id and title for response insertion
        const roleChoices = roles.map(({ role_id, title }) => ({
          name: title,
          value: role_id,
        }));
        // prompt for more user info
        inquirer
          .prompt([
            {
              name: "role_id",
              type: "list",
              message: "What is the role of your new employee?",
              // assigns mapped information for user selection
              choices: roleChoices,
            },
          ])
          // assign response to variable
          .then((response) => {
            let roleId = response.role_id;
            console.log(roleId);
            // call db see all employees to get database information and assign them to rows
            db.seeAllEmployees().then(([rows]) => {
              let employees = rows;
              // map-filer out necessary information for user response insertion
              const managerChoices = employees.map(
                ({ id, first_name, last_name }) => ({
                  name: `${first_name} ${last_name}`,
                  value: id,
                })
              );
              // create an option for no manager if the user does not want one.
                managerChoices.unshift({ name: "None", value: null });
                console.log(managerChoices);
                // prompt user for more information
              inquirer
                .prompt([
                  {
                    name: "manager_id",
                    type: "list",
                    message: "Who is the manager of your new employee?",
                    // Assigns mapped information for user selection
                    choices: managerChoices,
                  },
                ])
                // take user response and assign it to variable
                .then((response) => {
                  let managerId = response.manager_id;
                  console.log(managerId);
                  // assign all user-response variables to a parent variable, assigning it to schema characteristics
                  let employees = {
                    first_name: firstName,
                    last_name: lastName,
                    role_id: roleId,
                    manager_id: managerId,
                  };
                  // pass new parent variable through db function to create new employees using sql
                  db.createNewEmployee(employees)
                    .then(() =>
                      console.log("New employee added to the database")
                    )
                    // call to view all employees so you can see your changes, which calls the main menu options
                    .then(() => viewAllEmployees());
                });
            });
          });
      });
    });
};

// function to add roles to database
const addRole = () => {
  // calls db seeAllDepartments to retrieve data and assign them to rows
  db.seeAllDepartments().then(([rows]) => {
    // assign data to row and map-filter out necessary information for user insertion
    let departments = rows;
    const departmentChoices = departments.map(({ department_id, name }) => ({
      name: name,
      value: department_id,
    }));
    // prompt user for information
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
          // assigns mapped information for user selection
          choices: departmentChoices,
        },
      ])
      // take user response and pass it through db createNewRoles to add user information to database
      .then((response) => {
        db.createNewRoles(response)
          .then(() => console.log(`Added new role to the database!`))
          // calls viewAllRoles to show changes which calls the main menu
          .then(() => viewAllRoles());
      });
  });
};

// function to update employees
const updateEmployee = () => {
  // calls db seeAllEmployees function to obtain data then assign data to rows
  db.seeAllEmployees().then(([rows]) => {
    // assigns data to a variable
    let employees = rows;
    // map-filters necessary information for user insertion
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name}, ${last_name}`,
      value: id,
    }));
    // prompts user for information
    inquirer
      .prompt([
        {
          name: "employee_id",
          type: "list",
          message: "Which employee do you want to update?",
          choices: employeeChoices,
        },
      ])
      // takes response and assigns it to a variable
      .then((response) => {
        let employeeId = response.employee_id;
        // calls db seeAllRoles function and assigns it to rows
        db.seeAllRoles().then(([rows]) => {
          // assigns row data to variable
          let roles = rows;
          // map-filters out necessary data information for user insertion
          const roleChoices = roles.map(({ role_id, title }) => ({
            name: title,
            value: role_id,
          }));
          // prompts user for data
          inquirer
            .prompt([
              {
                name: "role_id",
                type: "list",
                message: "What is the new role for this employee?",
                // displays mapped data for user selection
                choices: roleChoices,
              },
            ])
            // assigns user response to a variable
            .then((response) => {
              let roleId = response.role_id;
              // inserts user responses to db updateEmployeeRoles function
              db.updateEmployeeRoles(employeeId, roleId)
                .then(() => console.log("Updated employee role!"))
                // calls viewAllEmployees to see changes and triggers the main menu
                .then(() => viewAllEmployees());
            });
        });
      });
  });
};

// kills the application when users quit from the main menu
const quit = () => {
  console.log("Goodbye!");
  process.exit();
};

// starts the application on node index
init();
