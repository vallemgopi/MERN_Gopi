const express = require('express');
const { addToWatchlist, getWatchlist, removeFromWatchlist } = require('../controllers/watchlistController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, addToWatchlist);
router.get('/', protect, getWatchlist);
router.delete('/:id', protect, removeFromWatchlist);

module.exports = router;
