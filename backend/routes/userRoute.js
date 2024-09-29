const express = require("express");
const { getUserInfoById } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/getMyUser", authMiddleware, getUserInfoById);


module.exports = router;