var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('./public/index.html', { root: __dirname });
});

router.get('/users', function(req, res, next) {
  res.sendFile('users.html', { root: './public'});
});
router.get('/tickets', function(req, res, next) {
  res.sendFile('tickets.html', { root: './public'});
});
router.get('/browseEvents', function(req, res, next) {
  res.sendFile('browseEvents.html', { root: './public'});
});
router.get('/createEvent', function(req, res, next) {
  res.sendFile('createEvent.html', { root: './public'});
});
router.get('/followPage', function(req, res, next) {
  res.sendFile('followPage.html', { root: './public'});
});

module.exports = router;
