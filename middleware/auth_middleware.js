 var db = require("../db");
 module.exports.checkCookie = (req, res, next) =>{
	if(! req.signedCookies.userId){
		res.redirect('/login');
		return;
	}
	next();
}