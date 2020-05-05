 
 module.exports.checkCookie = async function (req, res, next){
	if(! req.signedCookies.userId){
		res.redirect('/login');
		return;
	}
	let user = await User.findById(req.signedCookies.userId);

	if (!user) {
		res.redirect("/auth/login");
		return;
	}

	next();
}