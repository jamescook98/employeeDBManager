var connection = require("./connection.js");

var orm = {
  select: function(tableName) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [tableName], function(err, result) {
      if (err) throw err;
      console.table(result);
    });
  },
};

module.exports = orm;
