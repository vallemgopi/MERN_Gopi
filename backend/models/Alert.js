const mongoose = require('mongoose');

const AlertSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    asset: { type: String, required: true },
    targetPrice: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Alert', AlertSchema);
