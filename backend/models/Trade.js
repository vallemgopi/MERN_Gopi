const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    asset: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    tradeType: { type: String, enum: ['buy', 'sell'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Trade', TradeSchema);
