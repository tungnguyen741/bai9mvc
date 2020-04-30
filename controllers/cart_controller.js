module.exports.addToCart = (req, res, next)=>{
	var bookId = req.params.bookId;
	var sessionId = req.signedCookies.sessionId;

	if(! sessionId){
		res.redirect('/books');
		return;
	}
	var objCart = 'cart.sp'+ bookId;
	//cart={sp+bookId: y}
	var count = db.get('session')
								.find({id: sessionId})
								.get(objCart, 0)
								.value();

	db.get('session')
		.find({ id: sessionId })
		.set(objCart, ++count)
		.write();

	 // hien so lg gio hang
 
	res.redirect('/books');
}