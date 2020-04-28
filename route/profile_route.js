const express = require('express')
const router = express.Router()

const profile_controller = require("../controllers/profile_controller");
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });
 

 
router.get("/", profile_controller.indexProfile);
router.post("/",upload.single('avatar'), profile_controller.postProfile);
module.exports = router;
