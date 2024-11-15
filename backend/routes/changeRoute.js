const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const { create, getAll } = require('../controller/ChangeGestorController');

const router = express.Router();

router.post('/create', authMiddleware, create);
router.get('/getAll', authMiddleware, adminMiddleware, getAll);

module.exports = router;

