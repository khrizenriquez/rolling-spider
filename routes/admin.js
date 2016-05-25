var express = require('express');
var router 	= express.Router();

router.get('/rollingadmin', function (req, res, next) {
	res.render('home/admin', { 
  		title: 'Rolling Spider - demo, by Chris Enríquez'
  	});
});

module.exports = router;
