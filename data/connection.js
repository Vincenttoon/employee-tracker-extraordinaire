const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "testy",
    database: "employee_tracker",
  });
  
  module.exports = connection;