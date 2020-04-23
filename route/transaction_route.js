const express = require('express')
const router = express.Router()
const transaction_controller = require("../controllers/transaction_controller");

router.get('/', transaction_controller.indexTransaction);

router.get('/create', transaction_controller.createTransaction);

router.post('/create', transaction_controller.postCreateTransaction);

router.get('/:tranId/complete', transaction_controller.finishTransaction);

module.exports = router;