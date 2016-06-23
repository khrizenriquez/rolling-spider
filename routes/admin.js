var express = require('express');
var router 	= express.Router();

router.get('/khrizrollingadmin', function (req, res, next) { 
	//req.app.locals.layout = 'admin'; // set your layout here
	res.render('home/admin', { 
  		title: 'Admin rolling spider - demo, by Chris Enríquez', 
  		layout: 'admin'
  	});
});

module.exports = router;
