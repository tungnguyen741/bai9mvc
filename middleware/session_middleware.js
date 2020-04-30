var db = require('../db');
const shortid = require('shortid');

module.exports = (req, res, next) =>{
	var ssid = shortid.generate();
	if(! req.signedCookies.sessionId){
		res.cookie("sessionId",ssid,{
			signed: true
		});

		db.get('session').push({ id: ssid }).write();

	}

	next();

}