const express = require('express');
const { addAlert, getAlerts, removeAlert } = require('../controllers/alertController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addAlert);
router.get('/', protect, getAlerts);
router.delete('/:id', protect, removeAlert);

module.exports = router;
