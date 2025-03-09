const Trade = require('../models/Trade');

exports.addTrade = async (req, res) => {
    try {
        const { asset, amount, price, tradeType } = req.body;
        const trade = await Trade.create({
            user: req.user.id,
            asset,
            amount,
            price,
            tradeType
        });
        res.status(201).json(trade);
    } catch (error) {
        res.status(400).json({ error: 'Trade creation failed' });
    }
};

exports.getTrades = async (req, res) => {
    try {
        const trades = await Trade.find({ user: req.user.id });
        res.status(200).json(trades);
    } catch (error) {
        res.status(400).json({ error: 'Could not fetch trades' });
    }
};
