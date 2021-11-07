const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host:"u6354r3es4optspf.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user:"olkswvgflnfwcroa",
    password:"ntgo48ougpnhpyvi",
    database:"ul91wq884mhr6noe",
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