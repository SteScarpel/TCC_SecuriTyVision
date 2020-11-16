var mysql = require('mysql');
var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "s1811",
  database: "sv_db"
});
  
module.exports = { con }