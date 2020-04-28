 var db = require("../db");
 module.exports.checkCookie = (req, res, next) =>{
	console.log(req.signedCookies);
	if(! req.signedCookies.userId){
		res.redirect('/login');
		return;
	}
	console.log('auth locals: ', res.locals);
    console.log('auth cookies: ', req.cookies);
	next();
}