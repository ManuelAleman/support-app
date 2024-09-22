const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const inChargeMiddleware = require("../middleware/inChargeMiddleware");
const { createDepartment, getDepartmentByUser } = require("../controller/departmentController");
const router = express.Router();

router.post("/create", authMiddleware, createDepartment);
router.get("/getByUser", authMiddleware, inChargeMiddleware, getDepartmentByUser);



module.exports = router;