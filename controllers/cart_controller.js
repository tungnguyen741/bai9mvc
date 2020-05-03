var Session = require('../Models/session.model');
module.exports.addToCart = async function(req, res, next) {
    var bookId = req.params.bookId;
    var sessionId = req.signedCookies.sessionId;
    if (!sessionId) {
        res.redirect('/books');
        return;
    }
 
    // await Session.updateOne({ sskey: sessionId },
    //      { 'cart': {[bookId]:0} }
    // );

    var count = await Session.findOne({sskey: sessionId});

    // await Session.updateOne({ sskey: sessionId },
    //      { 'cart': {[bookId]: ++count.cart[bookId]} }
    // );
    await Session.findOneAndUpdate({ sskey: sessionId }, { $inc: { ['cart.' + bookId]: 1 } });
    
    console.log('countcart: ',  count.cart[bookId]);    
    console.log('count: ', count);


    res.redirect('/books');
}