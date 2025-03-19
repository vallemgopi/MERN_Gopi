const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    asset: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Watchlist', WatchlistSchema);
