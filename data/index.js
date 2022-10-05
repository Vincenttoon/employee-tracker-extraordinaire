const connection = require("./connection");

// class based method to call functions that execute sql commands
class DB {
  constructor(connection) {
    this.connection = connection;
  }

  // DEPARTMENT FUNCTIONALITY
  // views all current departments
  seeAllDepartments() {
    return this.connection.promise().query("SELECT * FROM departments");
  }
  // creates a new department and inserts it into the table
  createNewDepartment(department) {
    console.log(department)
    return this.connection
      .promise()
      .query("INSERT INTO departments SET name = ?", department);
  }

  // ROLES FUNCTIONALITY
  // views all current roles
  seeAllRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT title, role_id, departments.name department, salary FROM roles LEFT JOIN departments on roles.department_id = departments.department_id"
      );
  }

  // creates new roles
  createNewRoles(role) {
    return this.connection
        .promise()
        .query('INSERT INTO roles SET ?', role)
  }

  // updates current employees roles
  updateEmployeeRoles(employeeId, roleId) {
    return this.connection
        .promise()
        .query('UPDATE employees SET role_id = ? WHERE employee_id = ?', [
            roleId,
            employeeId,
        ]);
}

  // EMPLOYEE FUNCTIONALITY
  // lists all employees in database
  seeAllEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employees.employee_id id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) manager FROM employees LEFT JOIN roles on employees.role_id = roles.role_id LEFT JOIN departments on roles.department_id = departments.department_id LEFT JOIN employees manager on manager.employee_id = employees.manager_id;"
      );
  }

  // creates a new employee for the database
  createNewEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employees SET ?", employee);
  }

    // deletes employee (did not get here)
  deleteEmployee(employeeId) {
    return this.connection
      .promise()
      .query("DELETE FROM employees WHERE = ?", employeeId);
  }
}

// Exports new DB class with ths information into our connection
module.exports = new DB(connection);
