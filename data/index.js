const connection = require("./connection");

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

  createNewRoles(role) {
    return this.connection
        .promise()
        .query('INSERT INTO roles SET ?', role)
  }

  updateEmployeeRoles(employeeId, roleId) {
    return this.connection
        .promise()
        .query('UPDATE employees SET role_id = ? WHERE employee_id = ?', [
            roleId,
            employeeId,
        ]);
}

  // EMPLOYEE FUNCTIONALITY
  seeAllEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employees.employee_id id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) manager FROM employees LEFT JOIN roles on employees.role_id = roles.role_id LEFT JOIN departments on roles.department_id = departments.department_id LEFT JOIN employees manager on manager.employee_id = employees.manager_id;"
      );
  }

  createNewEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employees SET ?", employee);
  }

  deleteEmployee(employeeId) {
    return this.connection
      .promise()
      .query("DELETE FROM employees WHERE = ?", employeeId);
  }
}

module.exports = new DB(connection);
