const express = require("express");
const router = express.Router();
//upload file
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });

const user_controller = require('../controllers/user_controller');
const user_validate = require('../validate/user_validate');
router.get("/", user_controller.viewUser);

//show add users
router.get("/add",user_controller.addUser);

//add users
router.post("/add",upload.single('avatar'), user_validate.postAddUser , user_controller.postAddUser);
//delete users
router.get("/delete/:id", user_controller.deleteUser);

//view detail users
router.get("/detail/:id", user_controller.detailUser);

//update users
router.get("/profile/:id", user_controller.updateUser);
router.get("/update/:id", user_controller.updateUser);

router.post("/update/:id",upload.single('avatar') , user_controller.postUpdateUser);

module.exports = router;
