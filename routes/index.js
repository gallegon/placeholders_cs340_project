var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('./public/index.html', { root: __dirname });
});

router.get('/users', function(req, res, next) {
  res.sendFile('./public/users.html', { root: __dirname});
});
router.get('/tickets', function(req, res, next) {
  res.sendFile('./public/tickets.html', { root: __dirname});
});
router.get('/browseEvents', function(req, res, next) {
  res.sendFile('./public/browseEvents.html', { root: __dirname});
});
router.get('/createEvent', function(req, res, next) {
  res.sendFile('./public/createEvent.html', { root: __dirname});
});
router.get('/followPage', function(req, res, next) {
  res.sendFile('./public/followPage.html', { root: __dirname});
});

module.exports = router;
