var express = require('express');
var router 	= express.Router();

router.get('/inicio', function (req, res, next) {
	console.dir(req.session);
  	if (req.session.appName !== undefined) {
		res.render('home/home', { 
	  		title: 'Rolling Spider - demo, by Chris Enríquez'
	  	});
	} else {
		res.redirect('/');
	}
});

module.exports = router;
