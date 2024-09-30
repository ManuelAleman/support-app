const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const inChargeMiddleware = require("../middleware/inChargeMiddleware");
const { createDepartment, getMyBuildings } = require("../controller/departmentController");
const router = express.Router();

router.post("/create", authMiddleware, createDepartment);
router.get("/getMyBuildings/:id", authMiddleware, getMyBuildings);



module.exports = router;