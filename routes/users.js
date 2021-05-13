var express = require('express');
var router = express.Router();
//var mysql = require('../dbcon.js')
/*
function getUsers(res, mysql, context, complete) {
  mysql.pool.query("SELECT userID, firstName, lastName FROM Users", function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.users = results;
      complete();
  });
}
*/
function getUserPageByID(res, mysql, context, complete, id){
  let query1 = "SELECT firstName, lastName FROM Users WHERE userID = " + id + ";";
  mysql.pool.query(query1, function(error, results){
    if(error){
       res.write(JSON.stringify(error));
       res.end();
    }
    context.userInfo = results;
    complete();
  })
}

function getUserFollowers(res, mysql, context, complete, id){
  let query1 = "SELECT firstName FROM Users u INNER JOIN Users_Users uu ON u.userID=uu.followedBy WHERE uu.followedUser=" + id + ";";
  mysql.pool.query(query1, function(error, results){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.followers = results;
    complete();
  })
}

router.get('/', function(req, res)
    {
        let query1 = "SELECT * FROM Users;";
        mysql.pool.query(query1, function(error, rows, fields){
            res.render('users', {data: rows});
        })
    });

  
// get a specific user's page by their id ex www.example.com/user/1
router.get('/:id', function(req, res){
  var callbackCount = 0;
  var context = {};
  var mysql = req.app.get('mysql');
  var id = req.params.id;
  getUserPageByID(res, mysql, context, complete, id);
  getUserFollowers(res, mysql, context, complete, id);
  function complete() {
    callbackCount++;
    if(callbackCount >= 2){
       res.render('users',context);
    }
 }
});
/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
/*
router.get('/users', function(req, res, next){
  var callbackCount = 0;
  var context = {};
  context.jsscripts = [];
  var mysql = req.app.get('mysql');
  getUsers(res, mysql, context, complete);
  function complete(){
      callbackCount++;
      if(callbackCount >= 2) {
          res.render('users', context)
      }
  }
});
*/
module.exports = router;
