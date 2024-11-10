const express = require("express");
const { getUserInfoById, getAllInchargeUsers } = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/getMyUser", authMiddleware, getUserInfoById);
router.get("/getAllInchargeUsers", authMiddleware, adminMiddleware, getAllInchargeUsers);


module.exports = router;