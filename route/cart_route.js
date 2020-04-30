const express = require("express");
const router = express.Router();
const book_controller = require('../controllers/cart_controller');

//show books
router.get("/add/:bookId", book_controller.addToCart);
module.exports = router;
