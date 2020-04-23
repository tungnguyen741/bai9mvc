const express = require("express");
const router = express.Router();
const user_controller = require('../controllers/user_controller');

router.get("/", user_controller.viewUser);

//show add users
router.get("/add",user_controller.addUser);

//add users
router.post("/add", user_controller.postAddUser);
//delete users
router.get("/delete/:id", user_controller.deleteUser);

//view detail users
router.get("/detail/:id", user_controller.detailUser);

//update users
router.get("/update/:id", user_controller.updateUser);

router.post("/update/:id", user_controller.postUpdateUser);

module.exports = router;
