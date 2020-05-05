const shortid = require('shortid');
var Session = require('../Models/session.model');
var User = require('../Models/user.model');
module.exports = async function(req, res, next) {
    let ssid = shortid.generate();

    if (!req.signedCookies.sessionId) {
        let newSession = await Session.create({});
        res.cookie("sessionId", newSession.id, {
            signed: true
        });
    }

    if (req.signedCookies.userId) {
        let user = await User.findById(req.signedCookies.userId);
        if (user) {
            res.locals.user = user;
        }
    } 
    let session = await Session.findById(req.signedCookies.sessionId);
    let count = 0;
    if (session) {
        for (let book of session.cart) {
            count += book.quantity;
        }
    }
    res.locals.count = count;
    next();
}