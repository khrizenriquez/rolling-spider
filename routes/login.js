var express = require('express');
var router 	= express.Router();

router.get('/', function (req, res, next) {
	console.dir(req.session);
	if (req.session.appName !== undefined) {
		res.redirect('/inicio');
	} else {
		res.render('home/start', { 
	  		title: 'Conectate e inicia esta aventura'
	  	});
	}
});

module.exports = router;
