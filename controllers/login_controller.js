var db = require("../db");

var bcrypt = require('bcrypt')

module.exports.login = (req, res, next) =>{
	res.render('login');
}

module.exports.postLogin = (req, res, next) =>{

	const saltRounds = 10;
	const myPass = '123123';
	var dataUser = db.get('users').value();
	
	//bam pass

	bcrypt.hash(myPass, saltRounds).then(function(hash) {
	// Store hash in your password DB.
		dataUser.forEach(item =>{
			db.get('users')
			  .find({ id: 1 })
			  .assign({ password: hash })
			  .write()
		})	
	});
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(myPass, salt);
	dataUser.forEach(item =>{
			db.get('users')
			  .find({ id: item.id })
			  .assign({ password: hash })
			  .write()
		})	

	var email = req.body.email;
	var pass = req.body.pass;
	var userLoginTrue = db.get("users").find({ email: email }).value();
 	if(! userLoginTrue){
		res.render('login',{ errors: ["Email11 or password wrong !!!"], values: req.body });
		return;
		
	}
	if(userLoginTrue.wrongLoginCount > 3){
		res.render('login',{ errors: ["You have entered it incorrectly many times please contact the admin"], values: req.body });
		return;
	} 

	//check pass

	//increase count wrong login
			
	bcrypt.compare(pass, userLoginTrue.password).then( (err, result) =>{
		if(result){
				db.get('users')
			  .find({ id: userLoginTrue.id })
			  .assign({ wrongLoginCount: 0})
			  .write();
			res.cookie("userId", userLoginTrue.id);
			res.locals.id = userLoginTrue.id;
			res.locals.name = userLoginTrue.name;
			console.log('login locals: ', res.locals);
		    console.log('login cookies: ', req.cookies);
			res.redirect('/books');
		}
		else{
			//increase count wrong login
			db.get('users')
			.find({ id: userLoginTrue.id })
			.assign({ wrongLoginCount: ++userLoginTrue.wrongLoginCount})
			.write();

			res.render('login',{ errors: ["Email or password wrong !!!"], values: req.body });
		
			console.log(db.get('users').find({ id: userLoginTrue.id }).value());
		}
	})

 	
}