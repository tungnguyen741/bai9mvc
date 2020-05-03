const shortid = require('shortid');
var Session = require('../Models/session.model');
module.exports = async function (req, res, next) {
	var ssid = shortid.generate();
	if(! req.signedCookies.sessionId){
		res.cookie("sessionId",ssid,{
			signed: true
		});
	await new Session({ sskey: ssid }).save();	
	}

	next();

}