const express = require("express");
const router = express.Router();
const book_controller = require('../controllers/book_controller');

//show books
router.get("/", book_controller.showBook);
//show add books
router.get("/add", book_controller.showAdd);

//add books
router.post("/add", book_controller.postAddBook);

//delete books
router.get("/delete/:id", book_controller.deleteBook);

//view books
router.get("/detail/:id", book_controller.viewDetail);

//update books
router.get("/update/:id", book_controller.updateBook);

router.post("/update/:id", book_controller.postUpdateBook);

module.exports = router;
