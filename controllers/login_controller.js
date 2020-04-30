const db = require("../db");

const bcrypt = require('bcrypt')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY.trim());

module.exports.login = (req, res, next) =>{
	res.render('login');
}

module.exports.postLogin = (req, res, next) =>{
	let email = req.body.email;
	let pass = req.body.pass;
	const msg = {
	  from: 'tung.nguyen21098@gmail.com',
	  to: req.body.email,
	  subject: 'Cảnh báo bạn đăng nhập',
	  html: '<strong>Bạn đã nhập sai mật khẩu quá 3 lần, Vui lòng liên hệ Admin <b><i>tung.nguyen21098@gmail</b></i> để được hỗ trợ!!</strong>',
	};


	let userLoginTrue = db.get("users").find({ email: email }).value();

 	if(! userLoginTrue){
		res.render('login',{ errors: ["Email. or password wrong !!!"], values: req.body });
		return;
	}

	if(userLoginTrue.wrongLoginCount >= 3){
		sgMail.send(msg);
		res.render('login',{ errors: ["You have entered it incorrectly many times please contact the admin"], values: req.body });
		return;
	} 

	//check pass
	bcrypt.compare(pass, userLoginTrue.password, function(err, result) {
		if(result){
			db.get('users')
			  .find({ id: userLoginTrue.id })
			  .assign({ wrongLoginCount: 0})
			  .write();
			res.cookie("userId", userLoginTrue.id, {signed: true});
			res.clearCookie("sessionId");
			res.redirect('/books');
		}
		if(!result){
			db.get('users')
			.find({ id: userLoginTrue.id })
			.assign({ wrongLoginCount: ++userLoginTrue.wrongLoginCount})
			.write();

		  if(userLoginTrue.wrongLoginCount === 2){
		      res.render('login',{ errors: ["You have entered it incorrectly 2 times, if 3 times email will block !!!"], values: req.body });
		      return;
			}
		  res.render('login',{ errors: ["Email or password wrong123 !!!"], values: req.body }); 
		}

		
	});
 	
}