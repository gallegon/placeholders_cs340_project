var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');

// TODO update, create events.  Add a dynamic filter to events page

/*
Display all the events on the browse-event page
*/
function displayEvents(res, mysql, context, complete, id){
    let query1 = "SELECT eventID, eventName, dateTime, city, country FROM Events;";
    mysql.pool.query(query1, function(error, results){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.events = results;
        complete();
    })
}

// get /events route
router.get('/', function(req, res){
    var callbackCount = 0;
    context = {};
    var mysql = req.app.get('mysql');
    displayEvents(res, mysql, context, complete);
    function complete() {
        callbackCount++;
        if (callbackCount >= 1){
            res.render('events', context);
        }
    }
});

// delete an event by a specific ID
router.delete('/delete/:id', function(req, res){
    var mysql = req.app.get('mysql');
    id = req.params.id;
    var query1 = "DELETE FROM Events Where eventID = " + id + ";";
    mysql.pool.query(query1, function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.status(400);
            res.end();
        }else{
            res.status(202).end();
        }
    })
})

module.exports = router;

