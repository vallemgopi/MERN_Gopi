const express = require('express');
const { addTrade, getTrades } = require('../controllers/tradeController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addTrade);
router.get('/', protect, getTrades);

module.exports = router;
