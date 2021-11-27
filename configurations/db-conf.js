const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Sucely",
    database:"gym",
    multipleStatements: true
  });

  mysqlConnection.connect(function (err) {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log('En linea...');
    }
  });

  module.exports = mysqlConnection;