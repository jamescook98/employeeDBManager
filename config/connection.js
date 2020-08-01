// var mysql = require("mysql");

// var connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "password",
//   database: "employees"
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

//INSERT INTO parties (party_name, party_type, party_cost, client_id) VALUES ('Cigar', 'grown-up', 250, 3);


// connection.addEmployee(function(id, first_name, last_name, role_id, manager_id) {
//   var queryString = "INSERT INTO employee VALUES ?";
//   //this.connection.query("INSERT INTO employee SET ?", employee);
//   connection.query(queryString, [id, first_name, last_name, role_id, manager_id]);
// });

// id INT NOT NULL AUTO_INCREMENT,
//     first_name VARCHAR(30) NOT NULL,
//     last_name VARCHAR(30) NOT NULL,
//     role_id INT NOT NULL,
//     manager_id INT NOT NULL,
//module.exports = connection;


