const Watchlist = require('../models/Watchlist');

exports.addToWatchlist = async (req, res) => {
    try {
        const { asset } = req.body;
        const watchlistItem = await Watchlist.create({ user: req.user.id, asset });
        res.status(201).json(watchlistItem);
    } catch (error) {
        res.status(400).json({ error: 'Could not add to watchlist' });
    }
};

exports.getWatchlist = async (req, res) => {
    try {
        const watchlist = await Watchlist.find({ user: req.user.id });
        res.status(200).json(watchlist);
    } catch (error) {
        res.status(400).json({ error: 'Could not fetch watchlist' });
    }
};

exports.removeFromWatchlist = async (req, res) => {
    try {
        const { id } = req.params;
        await Watchlist.findByIdAndDelete(id);
        res.status(200).json({ message: 'Removed from watchlist' });
    } catch (error) {
        res.status(400).json({ error: 'Could not remove from watchlist' });
    }
};
