 var db = require("../db");
 module.exports.checkCookie = (req, res, next) =>{
	if(! req.cookies.userId){
		res.redirect('/login');
		return;
	}
	// res.locals.id = res.locals.id;
	// res.locals.name = res.locals.name;
	console.log('auth locals: ', res.locals);
    console.log('auth cookies: ', req.cookies);
	next();
}