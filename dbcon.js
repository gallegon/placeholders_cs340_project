var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_gallegon',
  password        : '8140',
  database        : 'cs340_gallegon'
});
module.exports.pool = pool;
