const mysql = require("mysql");

const conn = mysql.createConnection({
  host: "localhost",
  user: "gisuser",
  password: "12345",
  port: 3306,
  database: "nodejs_db",
});

module.exports = conn;
