var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

// gets a user's page by their unique user ID
function getUserPageByID(res, mysql, context, complete, id){
  let query1 = "SELECT userID, firstName, lastName FROM Users WHERE userID = " + id + ";";
  mysql.pool.query(query1, function(error, results){
    if(error){
       res.write(JSON.stringify(error));
       res.end();
    }
    context.userInfo = results;
    complete();
  })
}

// displays a user's followers from Users_Users table
function getUserFollowers(res, mysql, context, complete, id){
  let query1 = "SELECT userID, firstName FROM Users u INNER JOIN Users_Users uu ON u.userID=uu.followedBy WHERE uu.followedUser=" + id + ";";
  mysql.pool.query(query1, function(error, results){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.followers = results;
    complete();
  })
}

function displayAllUsers(res, mysql, context, complete){
  let query1 = "SELECT * FROM Users;";
  mysql.pool.query(query1, function(error, results) {
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.userData = results;
    complete();
  })
}

function deleteUser(id){
  $.ajax({
      url: '/users/delete/' + id,
      type: 'DELETE',
      success: function(result){
          window.location.reload();
      }
  })
};
router.get('/', function(req, res)
    {
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        displayAllUsers(res, mysql, context, complete);
        function complete() {
          callbackCount++;
          if(callbackCount >= 1){
             res.render('users',context);
          }
        }
    });

  
// get a specific user's page by their id ex www.example.com/user/1
router.get('/profile/:id', function(req, res){
  var callbackCount = 0;
  var context = {};
  var mysql = req.app.get('mysql');
  var id = req.params.id;
  // display basic user details
  getUserPageByID(res, mysql, context, complete, id);
  // display the user's follows
  getUserFollowers(res, mysql, context, complete, id);
  function complete() {
    callbackCount++;
    if(callbackCount >= 2){
       res.render('user-profile',context);
    }
  }
});

router.post('/add-user-form', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  /*
  // Capture NULL values
  let homeworld = parseInt(data['input-homeworld']);
  if (isNaN(homeworld))
  {
      homeworld = 'NULL'
  }

  let age = parseInt(data['input-age']);
  if (isNaN(age))
  {
      age = 'NULL'
  }
  */
  // Create the query and run it on the database
  var mysql = req.app.get('mysql');
  query1 = `INSERT INTO Users (firstName, lastName) VALUES ('${data['input-fname']}', '${data['input-lname']}')`;
  mysql.pool.query(query1, function(error, rows, fields){

      // Check to see if there was an error
      if (error) {

          // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
          console.log(error)
          res.sendStatus(400);
      }

      // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
      // presents it on the screen
      else
      {
          res.redirect('/users');
      }
  })
})

router.delete('/delete/:id', function(req, res){
  var mysql = req.app.get('mysql');
  id = req.params.id;
  console.log("id to delete: " + id);
  var sql = "DELETE FROM Users WHERE userID = " + id + ";";
  //var inserts = [req.params.id];
  sql = mysql.pool.query(sql, /*inserts,*/ function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.status(400);
          res.end();
      }else{
          res.status(202).end();
      }
  })
})

router.delete('/delete/:followedID/:followerID', function(req, res){
  var mysql = req.app.get('mysql');
  followedID = req.params.followedID;
  followerID = req.params.followerID;
  var sql = "DELETE FROM Users_Users WHERE followedUser = " + followedID + " AND followedBy = " + followerID + ";";
  sql = mysql.pool.query(sql, function(error, results, fields){
    if(error){
      res.write(JSON.stringify(error));
      res.status(400);
      res.end();
    }
    else{
      res.status(202).end();
    }
  })
})
module.exports = router;
