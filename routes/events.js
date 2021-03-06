var express = require('express');
var router = express.Router();
var mysql = require('../dbcon.js');


// TODO update, create events.  Add a dynamic filter to events page--filter by tags


/*
Display all the events on the browse-event page
*/
function displayEvents(res, mysql, context, complete){
    let query1 = "SELECT eventID, eventName, dateTime, city, country FROM Events;";
    mysql.pool.query(query1, function(error, results){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.events = results;
        complete();
    });
}


function getEventByID(res, mysql, context, complete, id){
    let query1 = "SELECT * FROM Events WHERE eventID = " + id + ";";
    mysql.pool.query(query1, function(error, results){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.event = results;
        complete();
    }); 
}

function getHosts(res, mysql, context, complete){
    let query1 = `SELECT * FROM Users;`
    mysql.pool.query(query1, function(error, results){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.hosts = results;
        complete();
    });
}

function getTagsByID(res, mysql, context, complete, id){
    let query1 = "SELECT tagName FROM Tags_Events WHERE eventID = " + id + ";";
    mysql.pool.query(query1, function(error, results){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.tags = results;
        complete();
    });
}

function filterEventsByTag(res, mysql, context, complete, tag){
    let sql = `Select * From Events INNER JOIN Tags_Events ON Events.eventID = Tags_Events.eventID AND Tags_Events.tagName = ?`;
    var inserts = [tag];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            console.log(error)
            res.write(JSON.stringify(error));
            res.end();
        }
        context.events = results;
        complete();
    });
}

function getTags(res, mysql, context, complete){
    let sql = `Select * From Tags`;
    sql = mysql.pool.query(sql, function(error, results, fields){
        if(error){
            console.log(error)
            res.write(JSON.stringify(error));
            res.end();
        }
        context.tags = results;
        complete();
    });
}

function getUpdateInfoByID(res, mysql, context, complete, id){
    let query1 = 'SELECT * FROM Events WHERE EventID =' + id + ';';
    mysql.pool.query(query1, function(error, results){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        context.eventToBeUpdated = results;
        complete();
    });
}

function checkTicketsAvailable(res, mysql, context, complete, id){
    let query1 = 'SELECT eventCapacity, numberAttending FROM Events WHERE EventID =' + id + ';';
    mysql.pool.query(query1, function(error, results){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        var ticketsRemaining = results[0].eventCapacity + results[0].numberAttending;
        console.log(results[0].eventCapacity - results[0].numberAttending);
        if (ticketsRemaining <= 0) {
            ticketsRemaining = 0;
        }
        // check for the number of users attending against event capacity
        context.availability = results;
        context.availability.ticketsAvailable = ticketsRemaining;
        complete();
    });
}

/*

GET Request routes 

*/


// get /events route
router.get('/', function(req, res){
    var callbackCount = 0;
    context = {};
    var mysql = req.app.get('mysql');
    displayEvents(res, mysql, context, complete);
    getHosts(res, mysql, context, complete);
    getTags(res, mysql, context, complete);
    function complete() {
        callbackCount++;
        if (callbackCount >= 3){
            res.render('events', context);
        }
    }
});

router.get('/filter/:tag', function(req, res){
    var callbackCount = 0;
    context = {};
    tag = req.params.tag;
    var mysql = req.app.get('mysql');
    displayEvents(res, mysql, context, complete);
    getHosts(res, mysql, context, complete);
    filterEventsByTag(res, mysql, context, complete, tag);
    getTags(res, mysql, context, complete);
    function complete() {
        callbackCount++;
        if (callbackCount >= 4){
            res.render('events', context);
        }
    }
});

// get a specific event page
router.get('/view/:id', function(req, res) {
    var callbackCount = 0;
    context = {};
    id = req.params.id;
    var mysql = req.app.get('mysql');
    getEventByID(res, mysql, context, complete, id);
    checkTicketsAvailable(res, mysql, context, complete, id);
    getTagsByID(res, mysql, context, complete, id);
    function complete() {
        callbackCount++;
        if (callbackCount >= 3){
            console.log(context.availability.ticketsAvailable);
            res.render('event', context);
        }
    }
});


// get a form for a specific event to update
router.get('/update/:id', function(req, res){
    var callbackCount = 0;
    context = {};
    id = req.params.id;
    var mysql = req.app.get('mysql');
    getUpdateInfoByID(res, mysql, context, complete, id);
    getEventByID(res, mysql, context, complete, id);
    function complete() {
        callbackCount++;
        if (callbackCount >= 2){
            res.render('update-event', context);
        }
    }
    
});

router.get('/get-ticket/:id', function(req, res){
    var callbackCount = 0;
    context = {};
    id = req.params.id;
    var mysql = req.app.get('mysql');
    getHosts(res, mysql, context, complete);
    getEventByID(res, mysql, context, complete, id);
    function complete() {
        callbackCount++;
        if (callbackCount >= 2) {
            res.render('get-tickets', context)
        }
    }
});

/* 

POST Request Routes 

*/


// and an event - TODO: simplfy request to use inserts 
router.post('/add-event-form', function(req, res){
    let data = req.body;

    var dateTime = req.body.date + " " + req.body.time;
    console.log(req.body.eventName);
    console.log(req.body.date);
    console.log(req.body.time);
    console.log(dateTime);
    var _entryFee = null;
    var _ticketPrice = null;
    if (data.hasEntryFee == "FALSE") {
        _entryFee = false;
        _ticketPrice = 0;
    }
    else {
        _entryFee = true;
        _ticketPrice = data.ticketPrice;
    }

    var mysql = req.app.get('mysql');
    query1 = `INSERT INTO Events (hostID, dateTime, eventName, venueName, addressLine1, addressLine2, city, state, country, zip, latitude, longitude, eventCapacity, hasEntryFee, ticketPrice, numberAttending) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`;  
    inserts = [data.hostID, dateTime, data.eventName, data.venueName, data.addressLine1, data.addressLine2, data.city, data.state, data.country, data.zip, data.latitude, data.longitude, data.eventCapacity, _entryFee, _ticketPrice, 0];
    query1 = mysql.pool.query(query1, inserts, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {
            console.log(error)
            res.sendStatus(400);
        }
  
        // redirect to events
        else
        {
            res.redirect('/events');
        }
    });
});


// add a ticket to Tickets for a given user and event
router.post('/add-ticket/:id', function(req, res){
    var mysql = req.app.get('mysql');
    let data = req.body;
    let id = req.params.id;
    var sql = "INSERT INTO Tickets (ownerID, eventID, confirmedArrival) VALUES (?, ?, 0);";
    var inserts = [data.ownerID, id];
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
    sql = "UPDATE Events SET numberAttending = numberAttending + 1;";
    sql = mysql.pool.query(sql);
    res.redirect('../');
});

// add a tag to an event
router.post('/add-tag/:id', function(req, res){
    var mysql = req.app.get('mysql');
    let data = req.body;
    let id = req.params.id;
    var sql = "CALL checkTagExists(?, ?);";
    inserts = [data.addTag, id];
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            console.log(error)
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.status(200);
            res.redirect('../view/' + id);
            res.end();
        }
    });
});


// update an event by specific id
router.post('/:id', function(req, res){
    var mysql = req.app.get('mysql');
    let data = req.body;
    let id = req.params.id;
    var dateTime = req.body.date + " " + req.body.time;
    var _entryFee = null;
    var _ticketPrice = null;
    if (data.hasEntryFee == "FALSE"){
        _entryFee = false;
        _ticketPrice = 0;
    }
    else {
        _entryFee = true;
        _ticketPrice = data.ticketPrice;
    }
    var sql = "UPDATE Events SET dateTime=?, eventName=?, venueName=?, addressLine1=?, addressLine2=?, city=?, state=?, country=?, zip=?, latitude=?, longitude=?, eventCapacity=?, hasEntryFee=?, ticketPrice=? WHERE eventID=?";
    var inserts = [dateTime, data.eventName, data.venueName, data.addressLine1, data.addressLine2, data.city, data.state, data.country, data.zip, data.latitude, data.longitude, data.eventCapacity, _entryFee, _ticketPrice, id];

    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
            console.log(error);
            res.write(JSON.stringify(error));
            res.end();
        }else{
            res.status(200);
            res.redirect('/events');
            res.end();
        }
    });
});


/*

PUT request routes

*/

// TODO: convert update event from a POST to a PUT request

/*

DELETE request routes

*/
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
    });
});


module.exports = router;

