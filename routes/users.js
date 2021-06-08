var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

// TODO: update a user, add a follower

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
  });
}

// gets all user's by their unique user ID
function getUsers(res, mysql, context, complete, id){
  let query1 = "SELECT userID, firstName, lastName FROM Users;";
  mysql.pool.query(query1, function(error, results){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.usersInfo = results;
    complete();
  });
}

// get user following
function getUserFollowing(res, mysql, context, complete, id){
  let query1 = "SELECT userID, firstName FROM Users u INNER JOIN Users_Users uu ON u.userID=uu.followedUser WHERE uu.followedBY=" + id + ";";
  //let query1 = "SELECT userID, firstName, lastName FROM Users;";
  mysql.pool.query(query1, function(error, results){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.following = results;
    complete();
  });
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
  });
}

function getUserEvents(res, mysql, context, complete, id){
  let query1 = "Select eventName, dateTime FROM Events where hostID =" + id + ";";
  mysql.pool.query(query1, function(error, results){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.userEvents = results;
    complete();
  });
}

function getUserTicketEvents(res, mysql, context, complete, id){
  let query1 = "SELECT eventName, dateTime FROM Events u INNER JOIN Tickets uu ON u.eventID=uu.eventID WHERE uu.ownerID=" + id + ";";
  mysql.pool.query(query1, function(error, results){
    if(error){
      res.write(JSON.stringify(error));
      res.end();
    }
    context.userTickets = results;
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
  });
}

function deleteUser(id){
  $.ajax({
      url: '/users/delete/' + id,
      type: 'DELETE',
      success: function(result){
          window.location.reload();
      }
  });
};

// get /users route
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

  
// get a specific user's page by their id ex www.example.com/user/profile/1
router.get('/profile/:id', function(req, res){
  var callbackCount = 0;
  var context = {};
  var mysql = req.app.get('mysql');
  var id = req.params.id;
  // display basic user details
  getUserPageByID(res, mysql, context, complete, id);
  // display the user's follows
  getUserFollowers(res, mysql, context, complete, id);
  // display the user's events
  getUserEvents(res, mysql, context, complete, id);
  // display all users
  getUsers(res, mysql, context, complete, id);
  // display user following
  getUserFollowing(res, mysql, context, complete, id);

  getUserTicketEvents(res, mysql, context, complete, id);

  function complete() {
    callbackCount++;
    if(callbackCount >= 6){
       res.render('user-profile',context);
    }
  }
});

// add a user using the form
router.post('/add-user-form', function(req, res){
  // Capture the incoming data and parse it back to a JS object
  let data = req.body;

  /*
  // Capture NULL values
  let latitude = parseInt(data['input-latitude']);
  if (isNaN(latitude))
  {
      latitude = 'NULL'
  }

  let longitude = parseInt(data['input-longitude']);
  if (isNaN(longitude))
  {
      longitude = 'NULL'
  }
  */
  // Create the query and run it on the database
  var mysql = req.app.get('mysql');
  query1 = `INSERT INTO Users (firstName, lastName, latitude, longitude) VALUES ('${data['input-fname']}', '${data['input-lname']}', '${data['input-latitude']}', '${data['input-longitude']}')`;
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


// delete a user with a specific id
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
  });
});

//add a user to follow by another user's account
router.post('/add-following/:id', function(req, res){
  var mysql = req.app.get('mysql');
  let data = req.body;
  let id = req.params.id;
  var sql = "INSERT INTO Users_Users (followedBy, followedUser) VALUES (?, ?);";
  var inserts = [id, data.followedID];
  sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
          console.log(error)
          res.write(JSON.stringify(error));
          res.end();
      }else{
          res.status(200);
          res.end();
      }
  });
  res.redirect('../profile/' + id );
});

//delete a following from a user's account
//router.delete('delete/:followingID'/)

// delete a follower from a user's account
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
  });
});
module.exports = router;
