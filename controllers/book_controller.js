var Transaction = require('../Models/transaction.model');  
var Book = require('../Models/data.model');
var User = require('../Models/user.model');
var Session = require('../Models/session.model');
module.exports.showBook = async function (req, res) {
  var dataBook = await Book.find();
  console.log( req.signedCookies.sessionId);
  var page = parseInt(req.query.page) || 1; //so trang
  var items = 8; // 8 item
  var start = (page-1)*items;
  var end = page*items;
  var endPage = Math.floor(dataBook.length / items)+1;

 
 try{
   var sessionOb = await Session.findOne({_id: req.signedCookies.sessionId});
   // var isUserAd = await User.findOne({_id: req.signedCookies.userId});
 }
 catch{}
  // if(sessionOb){
  //   var cartOb = sessionOb.cart; //cart{sp1:1,sp2:2};
  //   var sum = 0;
  //   for(let key in cartOb){
  //     sum += cartOb[key];
  //   }  
  // }

  if(res.locals.user){
    if(res.locals.user.isAdmin){
    res.render("books", { books: dataBook.slice(start, end),
      viewAction: true,
      user: res.locals.user,
      page: page,
      endPage: endPage,
      sumCart: res.locals.count 
      });
    }
    res.render("books",{ books: dataBook.slice(start, end),
      viewAction: false,
      user: res.locals.user,
      page,
      endPage,
      sumCart: res.locals.count  
     });
  }

  res.render("books",{ 
      books: dataBook.slice(start, end),
      viewAction: false,
      user: dataBook,
      page,
      endPage,
      sumCart: res.locals.count  
     });
  
 
}
module.exports.showAdd = (req, res) => {
  res.render("add");
};

module.exports.postAddBook = (req, res) => {
  let titleAdded = req.body.titleAdded;
  let descriptionAdded = req.body.descriptionAdded;
  new Book({
     title: titleAdded,
     description: descriptionAdded
  })
  .save()
  .then(res.redirect("/books"));
};

module.exports.deleteBook = async function (req, res)  {
  let id = req.params.id;
  await Book.deleteOne({ _id: id });
  await Transaction.deleteOne({ bookId: id })
  res.redirect("/books");
  
};

module.exports.viewDetail = async function (req, res) {
  let id = req.params.id;
  let dataDetail = await Book.find({_id: id});
  res.render("detail", { dataDetail});
};

module.exports.updateBook = async function (req, res)  {
  let id = req.params.id;
  let dataDetail =  await Book.find({_id: id});
  res.render("update", { dataDetail });
};

module.exports.postUpdateBook = async function (req, res)  { 
  await Book.updateOne({ _id: req.params.id},{
    title: req.body.titleUpdate,
    description: req.body.descriptionUpdate
  });

  res.redirect("/books");
};
