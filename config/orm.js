const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeesDB"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

var orm = {
  select: function(tableName) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [tableName], function(err, result) {
      if (err) throw err;
      console.table(result);
    });
  },
  selectByField: function(table, specificColumn, specificField) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    connection.query(queryString, [table, specificColumn, specificField], function(err, result) {
      if (err) throw err;
      console.table(result);
    });
  }
};

module.exports = orm;
