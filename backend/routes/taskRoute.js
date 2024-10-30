const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const inChargeMiddleware = require("../middleware/inChargeMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {createTask, getAllTasks, authorizeTask, getUnassignedTasks, getMyGeneratedTasks, getMyAssignedTasks, getAllBuildingAndEquipmentInfo} = require("../controller/taskController");
const router = express.Router();

router.post("/create", authMiddleware, createTask);
router.get("/getAll", authMiddleware, adminMiddleware, getAllTasks);
router.put("/authorize", authMiddleware, adminMiddleware, authorizeTask);
router.get("/getAllUnauthorize", authMiddleware, adminMiddleware, getUnassignedTasks);
router.get("/getMyGeneratedTasks", authMiddleware, getMyGeneratedTasks);
router.get("/getMyAssignedTasks", authMiddleware, inChargeMiddleware, getMyAssignedTasks);
router.get("/getAllBuildEquip", getAllBuildingAndEquipmentInfo);
module.exports = router;